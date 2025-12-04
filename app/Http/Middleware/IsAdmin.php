<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('IsAdmin middleware', [
            'url' => $request->url(),
            'path' => $request->path(),
            'auth_check' => Auth::check(),
            'user_role' => Auth::check() ? Auth::user()->role : 'not logged in',
        ]);
        
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            Log::warning('IsAdmin middleware blocked', [
                'url' => $request->url(),
                'auth_check' => Auth::check(),
                'user_role' => Auth::check() ? Auth::user()->role : 'not logged in',
            ]);
            
            // Get locale for redirect
            $locale = $request->route('locale') ?? session('locale', 'id');
            return redirect("/{$locale}")->with('error', 'Unauthorized. Admin access required.');
        }

        return $next($request);
    }
}
