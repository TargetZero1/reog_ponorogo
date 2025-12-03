<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsUser
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check()) {
            return redirect()->route('pesan.register', ['attraction' => $request->query('attraction')]);
        }

        // Prevent admin from accessing user-only pages (checkout, booking)
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard')->with('error', 'Admin tidak dapat melakukan pemesanan tiket. Silakan gunakan akun user untuk memesan.');
        }

        return $next($request);
    }
}

