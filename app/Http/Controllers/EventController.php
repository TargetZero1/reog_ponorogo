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
        $events = Event::orderBy('date', 'desc')->paginate(10);

        // If admin is viewing, include places so admin can manage both from same screen
        $places = Place::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Events/Index', [
            'events' => $events,
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
