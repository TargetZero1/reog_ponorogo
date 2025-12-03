<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
            'description' => 'nullable|string',
            'date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'capacity' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'published' => 'nullable|boolean',
        ]);

        $data['slug'] = Str::slug($data['title'] ?? now());

        Event::create($data);

        return redirect()->route('admin.events.index')->with('success', 'Event created successfully!');
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }

    // Get detailed report for a past event
    public function getEventReport($id)
    {
        $event = Event::findOrFail($id);
        
        // Get all tickets for this event
        $tickets = \App\Models\Ticket::where('source_id', $id)
            ->where('ticket_type', 'event')
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

    public function edit($id)
    {
        $event = Event::findOrFail($id);
        return Inertia::render('Events/Edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'capacity' => 'nullable|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'published' => 'nullable|boolean',
        ]);

        $data['slug'] = Str::slug($data['title'] ?? $event->title);

        $event->update($data);

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully!');
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return redirect()->route('admin.events.index');
    }

    // Toggle publish status for an event
    public function togglePublish(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update(['published' => !$event->published]);
        return response()->json(['success' => true, 'published' => $event->published]);
    }

    // Bulk delete events
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Event::whereIn('id', $ids)->delete();
        return redirect()->route('admin.events.index')->with('success', 'Events deleted successfully');
    }

    // Bulk publish events
    public function bulkPublish(Request $request)
    {
        $ids = $request->input('ids', []);
        $action = $request->input('action', 'publish'); // 'publish' or 'unpublish'
        $published = $action === 'publish' ? true : false;
        Event::whereIn('id', $ids)->update(['published' => $published]);
        return redirect()->route('admin.events.index')->with('success', 'Events updated successfully');
    }
}
