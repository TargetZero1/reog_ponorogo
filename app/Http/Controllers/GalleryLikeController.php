<?php

namespace App\Http\Controllers;

use App\Models\GalleryLike;
use Illuminate\Http\Request;

class GalleryLikeController extends Controller
{
    public function toggle(Request $request)
    {
        if (!auth()->check()) {
            return response()->json([
                'error' => 'Unauthenticated',
                'message' => 'Please login to like photos'
            ], 401);
        }

        $request->validate([
            'photo_id' => 'required|integer',
        ]);

        $userId = auth()->id();
        $photoId = $request->photo_id;

        $like = GalleryLike::where('user_id', $userId)
            ->where('photo_id', $photoId)
            ->first();

        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            GalleryLike::create([
                'user_id' => $userId,
                'photo_id' => $photoId,
            ]);
            $liked = true;
        }

        $count = GalleryLike::where('photo_id', $photoId)->count();

        return response()->json([
            'liked' => $liked,
            'count' => $count,
        ]);
    }

    public function getLikes(Request $request)
    {
        $photoIds = $request->input('photo_ids', []);
        
        $likes = GalleryLike::whereIn('photo_id', $photoIds)
            ->selectRaw('photo_id, COUNT(*) as count')
            ->groupBy('photo_id')
            ->get()
            ->keyBy('photo_id');

        $userLikes = [];
        if (auth()->check()) {
            $userLikes = GalleryLike::where('user_id', auth()->id())
                ->whereIn('photo_id', $photoIds)
                ->pluck('photo_id')
                ->toArray();
        }

        return response()->json([
            'likes' => $likes,
            'userLikes' => $userLikes,
        ]);
    }
}
