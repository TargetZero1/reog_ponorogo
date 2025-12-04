<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    
    protected $rootView = 'app';

    
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        
        // Get user - this will be null after logout
        $user = $request->user();
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user, // Explicitly set to null if logged out
            ],
            'csrf_token' => $request->session()->token(),
            'locale' => $locale,
            'translations' => trans('common', [], $locale),
        ];
    }
}
