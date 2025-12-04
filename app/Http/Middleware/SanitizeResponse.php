<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SanitizeResponse
{
    
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only process JSON responses
        if ($response->headers->get('Content-Type') && str_contains($response->headers->get('Content-Type'), 'application/json')) {
            $this->sanitizeJsonResponse($response);
        }

        return $response;
    }

    
    protected function sanitizeJsonResponse(Response $response): void
    {
        try {
            $content = json_decode($response->getContent(), true);

            if (is_array($content)) {
                $content = $this->removeSensitiveFields($content);
                $response->setContent(json_encode($content));
            }
        } catch (\Exception $e) {
            // If JSON decoding fails, leave response as is
        }
    }

    
    protected function removeSensitiveFields(array $data): array
    {
        $sensitiveFields = config('security.hidden_fields', [
            'password',
            'password_confirmation',
            'remember_token',
            'api_token',
            'api_key',
            'secret_key',
            'private_key',
            'access_token',
            'refresh_token',
            'two_factor_secret',
        ]);

        foreach ($data as $key => &$value) {
            if (in_array(strtolower($key), array_map('strtolower', $sensitiveFields))) {
                unset($data[$key]);
            } elseif (is_array($value)) {
                $data[$key] = $this->removeSensitiveFields($value);
            }
        }

        return $data;
    }
}
