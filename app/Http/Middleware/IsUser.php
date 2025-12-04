<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsUser
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->route('locale') ?? session('locale', 'id');

        if (!Auth::check()) {
            return redirect()->route('pesan.register', [
                'locale' => $locale,
                'attraction' => $request->query('attraction'),
            ]);
        }

        // Prevent admin from accessing user-only pages (checkout, booking)
        $user = Auth::user();
        if ($user && $user->role === 'admin') {
            return redirect()->route('admin.dashboard', ['locale' => $locale])
                ->with('error', 'Admin tidak dapat melakukan pemesanan tiket. Silakan gunakan akun user untuk memesan.');
        }

        return $next($request);
    }
}

