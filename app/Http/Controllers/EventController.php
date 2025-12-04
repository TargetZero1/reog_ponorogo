<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function index()
    {
        $now = now();
        
        // Upcoming events (date >= now)
        $upcomingEvents = Event::where('date', '>=', $now)
            ->orderBy('date', 'asc')
            ->paginate(10, ['*'], 'upcoming_page');
        
        // Past events (date < now)
        $pastEvents = Event::where('date', '<', $now)
            ->orderBy('date', 'desc')
            ->paginate(10, ['*'], 'past_page');

        // If admin is viewing, include places so admin can manage both from same screen
        $places = Place::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Events/Index', [
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
            'places' => $places,
        ]);
    }

    public function create()
    {
        return Inertia::render('Events/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'location_en' => 'nullable|string|max:255',
            'capacity' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'published' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $data['slug'] = Str::slug($data['title'] ?? now());

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . Str::slug($data['title']) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/events'), $imageName);
            $data['image_path'] = '/images/events/' . $imageName;
        }

        Event::create($data);

        return redirect()->route('admin.events.index', ['locale' => request()->route('locale')])->with('success', 'Event created successfully!');
    }

    public function show($event)
    {
        // Log for debugging
        Log::info('EventController@show called', [
            'event_param' => $event,
            'event_type' => gettype($event),
            'request_url' => request()->url(),
            'request_path' => request()->path(),
            'route_params' => request()->route()->parameters(),
            'all_params' => request()->all(),
        ]);
        
        // Get event ID from route parameter - Laravel resource routes use 'event' as parameter name
        $eventId = $event;
        
        // If $event is the string "id", it means route binding failed - get ID from URL segment instead
        if ($event === 'id' || $event === 'en') {
            $pathSegments = explode('/', trim(request()->path(), '/'));
            // Path format: {locale}/admin/events/{id}
            // So segments are: [locale, admin, events, id]
            if (count($pathSegments) >= 4 && $pathSegments[1] === 'admin' && $pathSegments[2] === 'events') {
                $eventId = $pathSegments[3];
            } else {
                Log::error('EventController@show: Cannot extract event ID from path', [
                    'path' => request()->path(),
                    'segments' => $pathSegments,
                ]);
                abort(404, 'Event ID not found in URL');
            }
        }
        
        // Handle both route model binding and manual ID lookup
        try {
            $eventModel = $eventId instanceof Event ? $eventId : Event::findOrFail($eventId);
            return Inertia::render('Events/Show', [
                'event' => $eventModel,
            ]);
        } catch (\Exception $e) {
            Log::error('EventController@show error', [
                'event_param' => $event,
                'event_id' => $eventId,
                'error' => $e->getMessage(),
            ]);
            abort(404, 'Event not found: ' . $eventId);
        }
    }

    // Get detailed report for a past event
    public function getEventReport($id)
    {
        // Get event ID from route parameter
        $eventId = $id;
        if ($id === 'id' || $id === 'en') {
            $pathSegments = explode('/', trim(request()->path(), '/'));
            // Path format: {locale}/admin/events/{id}/report
            // So segments are: [locale, admin, events, id, report]
            if (count($pathSegments) >= 5 && $pathSegments[1] === 'admin' && $pathSegments[2] === 'events') {
                $eventId = $pathSegments[3];
            } else {
                abort(404, 'Event ID not found in URL');
            }
        }
        
        $event = Event::findOrFail($eventId);
        
        // Get all tickets for this event (check by attraction_name matching event title or source_id)
        $tickets = \App\Models\Ticket::where(function($query) use ($event, $eventId) {
                $query->where('attraction_name', $event->title)
                      ->orWhere(function($q) use ($eventId) {
                          $q->where('source_id', $eventId)
                            ->where('ticket_type', 'event');
                      });
            })
            ->with('user')
            ->get();
        
        $report = [
            'event' => $event,
            'total_tickets_sold' => $tickets->sum('quantity'),
            'total_revenue' => $tickets->sum('total_price'),
            'total_orders' => $tickets->count(),
            'unique_buyers' => $tickets->pluck('user_id')->unique()->count(),
            'average_order_value' => $tickets->count() > 0 ? $tickets->avg('total_price') : 0,
            'capacity_utilization' => $event->capacity > 0 ? ($tickets->sum('quantity') / $event->capacity) * 100 : 0,
            'payment_status_breakdown' => [
                'completed' => $tickets->where('payment_status', 'completed')->sum('quantity'),
                'pending' => $tickets->where('payment_status', 'pending')->sum('quantity'),
                'cancelled' => $tickets->where('payment_status', 'cancelled')->sum('quantity'),
                'refunded' => $tickets->where('payment_status', 'refunded')->sum('quantity'),
            ],
            'revenue_by_status' => [
                'completed' => $tickets->where('payment_status', 'completed')->sum('total_price'),
                'pending' => $tickets->where('payment_status', 'pending')->sum('total_price'),
                'cancelled' => $tickets->where('payment_status', 'cancelled')->sum('total_price'),
                'refunded' => $tickets->where('payment_status', 'refunded')->sum('total_price'),
            ],
            'tickets' => $tickets->map(function ($ticket) {
                return [
                    'id' => $ticket->id,
                    'user_name' => $ticket->user->name ?? 'Unknown',
                    'user_email' => $ticket->user->email ?? 'N/A',
                    'quantity' => $ticket->quantity,
                    'total_price' => $ticket->total_price,
                    'payment_status' => $ticket->payment_status,
                    'visit_date' => $ticket->visit_date,
                    'created_at' => $ticket->created_at,
                ];
            }),
        ];
        
        return response()->json($report);
    }

    public function edit($event)
    {
        // Get event ID from route parameter
        $eventId = $event;
        if ($event === 'id' || $event === 'en') {
            $pathSegments = explode('/', trim(request()->path(), '/'));
            if (count($pathSegments) >= 5 && $pathSegments[1] === 'admin' && $pathSegments[2] === 'events') {
                $eventId = $pathSegments[3];
            } else {
                abort(404, 'Event ID not found in URL');
            }
        }
        
        // Handle both route model binding and manual ID lookup
        $eventModel = $eventId instanceof Event ? $eventId : Event::findOrFail($eventId);
        return Inertia::render('Events/Edit', [
            'event' => $eventModel,
        ]);
    }

    public function update(Request $request, $event)
    {
        // Get event ID from route parameter
        $eventId = $event;
        if ($event === 'id' || $event === 'en') {
            $pathSegments = explode('/', trim(request()->path(), '/'));
            if (count($pathSegments) >= 4 && $pathSegments[1] === 'admin' && $pathSegments[2] === 'events') {
                $eventId = $pathSegments[3];
            } else {
                abort(404, 'Event ID not found in URL');
            }
        }
        
        // Handle both route model binding and manual ID lookup
        $eventModel = $eventId instanceof Event ? $eventId : Event::findOrFail($eventId);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'location_en' => 'nullable|string|max:255',
            'capacity' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'published' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $data['slug'] = Str::slug($data['title'] ?? $eventModel->title);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($eventModel->image_path && file_exists(public_path($eventModel->image_path))) {
                unlink(public_path($eventModel->image_path));
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . Str::slug($data['title']) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/events'), $imageName);
            $data['image_path'] = '/images/events/' . $imageName;
        }

        $eventModel->update($data);

        return redirect()->route('admin.events.index', ['locale' => request()->route('locale')])->with('success', 'Event updated successfully!');
    }

    public function destroy($event)
    {
        // Get event ID from route parameter
        $eventId = $event;
        if ($event === 'id' || $event === 'en') {
            $pathSegments = explode('/', trim(request()->path(), '/'));
            if (count($pathSegments) >= 4 && $pathSegments[1] === 'admin' && $pathSegments[2] === 'events') {
                $eventId = $pathSegments[3];
            } else {
                abort(404, 'Event ID not found in URL');
            }
        }
        
        // Handle both route model binding and manual ID lookup
        $eventModel = $eventId instanceof Event ? $eventId : Event::findOrFail($eventId);
        $eventModel->delete();
        return redirect()->route('admin.events.index', ['locale' => request()->route('locale')]);
    }

    // Toggle publish status for an event
    public function togglePublish(Request $request, $id)
    {
        // Get event ID from route parameter
        $eventId = $id;
        if ($id === 'id' || $id === 'en') {
            $pathSegments = explode('/', trim(request()->path(), '/'));
            // Path format: {locale}/admin/events/{id}/toggle-publish
            // So segments are: [locale, admin, events, id, toggle-publish]
            if (count($pathSegments) >= 5 && $pathSegments[1] === 'admin' && $pathSegments[2] === 'events') {
                $eventId = $pathSegments[3];
            } else {
                abort(404, 'Event ID not found in URL');
            }
        }
        
        $event = Event::findOrFail($eventId);
        $event->update(['published' => !$event->published]);
        return redirect()->back()->with('success', $event->published ? 'Event published successfully' : 'Event unpublished successfully');
    }

    // Bulk delete events
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Event::whereIn('id', $ids)->delete();
        return response()->json(['success' => true, 'message' => 'Events deleted successfully']);
    }

    // Bulk publish events
    public function bulkPublish(Request $request)
    {
        $ids = $request->input('ids', []);
        $action = $request->input('action', 'publish'); // 'publish' or 'unpublish'
        $published = $action === 'publish' ? true : false;
        Event::whereIn('id', $ids)->update(['published' => $published]);
        return response()->json(['success' => true, 'message' => 'Events updated successfully']);
    }
}
