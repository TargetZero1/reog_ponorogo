<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class SecureAuthentication
{
    
    public function handle(Request $request, Closure $next): Response
    {
        // Log authentication attempts
        if ($request->is('*/login') && $request->method() === 'POST') {
            $email = $request->input('email');
            $key = 'login_attempts:' . $email;

            if (RateLimiter::tooManyAttempts($key, 5)) {
                Log::warning('Too many login attempts', ['email' => $email, 'ip' => $request->ip()]);
                
                return response()->json([
                    'message' => 'Too many login attempts. Please try again later.',
                ], 429);
            }

            RateLimiter::hit($key, 15 * 60);
        }

        return $next($request);
    }
}
