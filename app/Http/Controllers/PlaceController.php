<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Place;

class PlaceController extends Controller
{
    // Admin index - manage places
    public function index(Request $request)
    {
        $places = Place::orderBy('created_at', 'desc')->paginate(15);
        return Inertia::render('Admin/Wisata', [
            'places' => $places,
        ]);
    }

    public function create()
    {
        return Inertia::render('Places/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'hours' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric',
            'image_path' => 'nullable|string|max:1024',
            'price' => 'nullable|numeric',
            'highlights' => 'nullable',
            'activities' => 'nullable',
            'facilities' => 'nullable',
            'best_time' => 'nullable|string|max:255',
            'published' => 'nullable|boolean',
        ]);

        // Normalize arrays if JSON strings provided
        foreach (['highlights', 'activities', 'facilities'] as $key) {
            if (!empty($data[$key]) && is_string($data[$key])) {
                $decoded = json_decode($data[$key], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $data[$key] = $decoded;
                }
            }
        }

        Place::create($data);

        return redirect()->route('admin.places.index')->with('success', 'Place created');
    }

    public function edit($id)
    {
        $place = Place::findOrFail($id);
        return Inertia::render('Places/Edit', [
            'place' => $place,
        ]);
    }

    public function update(Request $request, $id)
    {
        $place = Place::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'hours' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric',
            'image_path' => 'nullable|string|max:1024',
            'price' => 'nullable|numeric',
            'highlights' => 'nullable',
            'activities' => 'nullable',
            'facilities' => 'nullable',
            'best_time' => 'nullable|string|max:255',
            'published' => 'nullable|boolean',
        ]);

        foreach (['highlights', 'activities', 'facilities'] as $key) {
            if (!empty($data[$key]) && is_string($data[$key])) {
                $decoded = json_decode($data[$key], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $data[$key] = $decoded;
                }
            }
        }

        $place->update($data);

        return redirect()->route('admin.places.index')->with('success', 'Place updated');
    }

    public function destroy($id)
    {
        $place = Place::findOrFail($id);
        $place->delete();
        return redirect()->route('admin.places.index')->with('success', 'Place deleted');
    }

    // Toggle publish status for a place
    public function togglePublish(Request $request, $id)
    {
        $place = Place::findOrFail($id);
        $place->update(['published' => !$place->published]);
        return response()->json(['success' => true, 'published' => $place->published]);
    }

    // Bulk delete places
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Place::whereIn('id', $ids)->delete();
        return redirect()->route('admin.places.index')->with('success', 'Places deleted successfully');
    }

    // Bulk publish places
    public function bulkPublish(Request $request)
    {
        $ids = $request->input('ids', []);
        $action = $request->input('action', 'publish'); // 'publish' or 'unpublish'
        $published = $action === 'publish' ? true : false;
        Place::whereIn('id', $ids)->update(['published' => $published]);
        return redirect()->route('admin.places.index')->with('success', 'Places updated successfully');
    }
}
