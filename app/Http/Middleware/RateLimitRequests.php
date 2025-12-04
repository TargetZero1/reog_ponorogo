<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RateLimitRequests
{
    protected $limiter;

    public function __construct(RateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    
    public function handle(Request $request, Closure $next, $limit = 60, $decay = 1): Response
    {
        $key = $this->resolveRequestSignature($request);

        if ($this->limiter->tooManyAttempts($key, $limit)) {
            return response()->json([
                'message' => 'Too many requests. Please try again later.',
                'retry_after' => $this->limiter->availableIn($key),
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }

        $this->limiter->hit($key, $decay * 60);

        $response = $next($request);

        return $this->addHeaders(
            $response,
            $limit,
            $this->limiter->attempts($key)
        );
    }

    
    protected function resolveRequestSignature(Request $request): string
    {
        return hash('sha256', $request->user()?->id ?: $request->ip());
    }

    
    protected function addHeaders(Response $response, $limit, $attempts): Response
    {
        $response->headers->add([
            'X-RateLimit-Limit' => $limit,
            'X-RateLimit-Remaining' => max(0, $limit - $attempts),
        ]);

        return $response;
    }
}
