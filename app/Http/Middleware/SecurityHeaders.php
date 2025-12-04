<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Hide Laravel version
        $response->headers->remove('Server');

        // Apply security headers from config
        $securityHeaders = config('security.security_headers', []);
        
        foreach ($securityHeaders as $header => $value) {
            $response->headers->set($header, $value);
        }

        // Additional security headers
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        $response->headers->set('X-Permitted-Cross-Domain-Policies', 'none');
        $response->headers->set('Cross-Origin-Embedder-Policy', 'require-corp');
        $response->headers->set('Cross-Origin-Opener-Policy', 'same-origin');
        $response->headers->set('Cross-Origin-Resource-Policy', 'same-origin');

        return $response;
    }
}
