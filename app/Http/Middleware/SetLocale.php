<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    
    public function handle(Request $request, Closure $next): Response
    {
        $firstSegment = $request->segment(1);
        $locale = $request->route('locale') ?? $firstSegment;

        $excludedPrefixes = [
            'admin',
            'storage',
            'build',
            'vendor',
            '_next',
            'vite',
            'assets',
            'logout',
            'set-locale',
        ];

        // If path starts with excluded prefix (admin/assets), skip locale enforcement
        if (in_array($firstSegment, $excludedPrefixes, true)) {
            $storedLocale = Session::get('locale', 'id');
            App::setLocale($storedLocale);
            return $next($request);
        }

        if (!in_array($locale, ['id', 'en'], true)) {
            $locale = Session::get('locale', 'id');
            $path = trim($request->getPathInfo(), '/');
            $redirectPath = $path ? "/{$locale}/{$path}" : "/{$locale}";
            return redirect($redirectPath);
        }

        App::setLocale($locale);
        Session::put('locale', $locale);

        return $next($request);
    }
}

