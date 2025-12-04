<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use App\Models\Place;
use App\Models\Event;

// Language switcher route (before locale middleware)
Route::get('/set-locale/{locale}', function ($locale) {
    if (in_array($locale, ['id', 'en'])) {
        session(['locale' => $locale]);
        return redirect()->back();
    }
    return redirect()->back();
})->name('locale.switch');

// Routes with locale prefix
Route::prefix('{locale}')->where(['locale' => 'id|en'])->group(function () {
    
    // 1. HOME
    Route::get('/', function ($locale) {
        return Inertia::render('App');
    })->name('home');

    // 2. BUDAYA
    Route::get('/budaya-dan-sejarah', function ($locale) {
        return Inertia::render('BudayaDanSejarah');
    })->name('budaya');

    // 3. PLACES INDEX
    Route::get('/tempat-wisata', function ($locale) {
        $places = Place::where('published', true)->orderBy('name')->get();
        return Inertia::render('TempatWisata', [
            'places' => $places,
        ]);
    })->name('places.index');

    // 4. EVENTS INDEX
    Route::get('/events', function ($locale) {
        $events = Event::where('published', true)
            ->where('date', '>=', now())
            ->orderBy('date', 'asc')
            ->paginate(12);
        return Inertia::render('Events/PublicIndex', [
            'events' => $events,
        ]);
    })->name('events.index');

    // 5. EVENTS SHOW (Public - only published events)
    Route::get('/events/{slug}', function ($locale, $slug) {
        $event = Event::where('slug', $slug)
            ->where('published', true)
            ->firstOrFail();
        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    })->name('events.show');

    // --- Booking & Auth Routes ---
    Route::get('/pesan-ticket/register', [BookingController::class, 'showRegister'])->name('pesan.register');
    Route::post('/pesan-ticket/register', [BookingController::class, 'register'])->name('pesan.register.post');
    Route::get('/pesan-ticket/login', [BookingController::class, 'showLogin'])->name('pesan.login');
    Route::post('/pesan-ticket/login', [BookingController::class, 'login'])->name('pesan.login.post');

    Route::get('/login', [BookingController::class, 'showLogin'])->name('login');

    Route::get('/pesan-ticket/checkout', [BookingController::class, 'showCheckout'])->middleware('user')->name('pesan.checkout');
    Route::post('/pesan-ticket/create', [BookingController::class, 'createTicket'])->middleware('user')->name('pesan.create');
    Route::get('/pesan-ticket/confirmation/{id}', [BookingController::class, 'showConfirmation'])->middleware('user')->name('pesan.confirmation');

    Route::get('/payment-history', [BookingController::class, 'showPaymentHistory'])->name('payment.history');

    // --- Profile Routes ---
    Route::get('/profile', function ($locale) {
        return Inertia::render('Profile');
    })->middleware('auth')->name('profile');

    Route::put('/profile', function (Request $request, $locale) {
        $user = $request->user();
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
        ]);
        $user->name = $data['name'];
        $user->email = $data['email'];
        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }
        $user->save();
        FacadesAuth::setUser($user);
        return redirect()->back()->with('success', trans('profile.success'));
    })->middleware('auth')->name('profile.update');

    // --- Admin Routes (with locale prefix) ---
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        // Explicitly define resource routes to ensure parameter names match
        // Note: Laravel resource routes use singular form by default, so 'events' becomes 'event'
        // But we need to explicitly set parameters to ensure consistency
        Route::resource('events', EventController::class)->parameters(['events' => 'event']);
        Route::resource('places', \App\Http\Controllers\PlaceController::class)->parameters(['places' => 'place']);
        
        // Custom routes that use {id} instead of {event}/{place}
        Route::patch('events/{id}/toggle-publish', [EventController::class, 'togglePublish'])->name('events.toggle-publish');
        Route::patch('places/{id}/toggle-publish', [\App\Http\Controllers\PlaceController::class, 'togglePublish'])->name('places.toggle-publish');
        
        Route::get('events/{id}/report', [EventController::class, 'getEventReport'])->name('events.report');
        
        Route::post('events/bulk/delete', [EventController::class, 'bulkDelete'])->name('events.bulk-delete');
        Route::post('events/bulk/publish', [EventController::class, 'bulkPublish'])->name('events.bulk-publish');
        Route::post('places/bulk/delete', [\App\Http\Controllers\PlaceController::class, 'bulkDelete'])->name('places.bulk-delete');
        Route::post('places/bulk/publish', [\App\Http\Controllers\PlaceController::class, 'bulkPublish'])->name('places.bulk-publish');

        Route::get('/dashboard', [BookingController::class, 'adminDashboard'])->name('dashboard');
        Route::get('/analytics', [BookingController::class, 'adminAnalytics'])->name('analytics');
        Route::get('/analytics/export', [BookingController::class, 'adminExportAnalytics'])->name('analytics.export');
        Route::get('/orders', [BookingController::class, 'adminOrders'])->name('orders');
        Route::get('/orders/export', [BookingController::class, 'adminExportOrders'])->name('orders.export');
        Route::get('/orders/{id}', [BookingController::class, 'adminOrderShow'])->name('orders.show');
        Route::post('/orders/{id}/status', [BookingController::class, 'adminUpdateOrderStatus'])->name('orders.update_status');
        Route::get('/users', [BookingController::class, 'adminUsers'])->name('users');
        Route::get('/reports', [BookingController::class, 'adminReports'])->name('reports');
        Route::get('/reports/export', [BookingController::class, 'adminExportReports'])->name('reports.export');
    });

    // Optional GET logout under locale - just redirect to home to avoid loops
    Route::get('/logout', function ($locale) {
        return redirect("/{$locale}");
    })->name('logout.get');
});

// Fallback route - redirect to default locale (id)
Route::get('/', function () {
    return redirect('/id');
});

// Logout post handler - must be outside locale group to avoid redirect loops
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
Route::post('/logout', function (Request $request) {
    // Get locale from session BEFORE invalidating
    $locale = $request->session()->get('locale', 'id');
    
    // Perform complete logout - order matters!
    Auth::logout();
    
    // Invalidate and regenerate session
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    
    // Clear all session data
    $request->session()->flush();
    
    // Redirect to login page with locale - use 303 See Other for POST redirect
    $response = redirect("/{$locale}/pesan-ticket/login", 303);
    
    // Add cache-busting headers to prevent browser caching
    $response->header('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private');
    $response->header('Pragma', 'no-cache');
    $response->header('Expires', '0');
    
    // Explicitly delete session cookie to force browser to forget session
    $sessionName = config('session.cookie', 'reogheritage-session');
    $response->cookie($sessionName, null, -1, '/', null, false, true);
    
    return $response;
})->name('logout')->middleware('web');

// Graceful GET fallback (just redirect to locale home without performing logout logic)
Route::get('/logout', function () {
    $locale = session('locale', 'id');
    return redirect("/{$locale}");
});
