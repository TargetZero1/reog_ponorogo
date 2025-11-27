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

Route::get('/', function () {
    return Inertia::render('App');
});

Route::get('/budaya-dan-sejarah', function () {
    return Inertia::render('BudayaDanSejarah');
});

Route::get('/tempat-wisata', function () {
    $places = Place::where('published', true)->orderBy('name')->get();
    return Inertia::render('TempatWisata', [
        'places' => $places,
    ]);
});

Route::get('/events', function () {
    $events = Event::where('published', true)->orderBy('date', 'asc')->paginate(12);
    return Inertia::render('Events/PublicIndex', [
        'events' => $events,
    ]);
});

Route::get('/events/{slug}', function ($slug) {
    $event = Event::where('slug', $slug)->firstOrFail();
    return Inertia::render('Events/Show', [
        'event' => $event,
    ]);
})->name('events.show');

Route::get('/pesan-ticket/register', [BookingController::class, 'showRegister'])->name('pesan.register');
Route::post('/pesan-ticket/register', [BookingController::class, 'register'])->name('pesan.register.post');
Route::get('/pesan-ticket/login', [BookingController::class, 'showLogin'])->name('pesan.login');
Route::post('/pesan-ticket/login', [BookingController::class, 'login'])->name('pesan.login.post');

Route::get('/login', [BookingController::class, 'showLogin'])->name('login');

Route::get('/pesan-ticket/checkout', [BookingController::class, 'showCheckout'])->name('pesan.checkout');
Route::post('/pesan-ticket/create', [BookingController::class, 'createTicket'])->middleware('auth')->name('pesan.create');
Route::get('/pesan-ticket/confirmation/{id}', [BookingController::class, 'showConfirmation'])->name('pesan.confirmation');

Route::get('/payment-history', [BookingController::class, 'showPaymentHistory'])->name('payment.history');

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->middleware('auth')->name('profile');

Route::put('/profile', function (Request $request) {
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

    // Refresh session user
    FacadesAuth::setUser($user);

    return redirect()->back()->with('success', 'Profil berhasil diperbarui.');
})->middleware('auth')->name('profile.update');


// Admin Dashboard & Analytics - Admin only
Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
    // Admin resource routes for events and places (admin management)
    Route::resource('events', EventController::class);
    Route::resource('places', \App\Http\Controllers\PlaceController::class);

    // Publish toggle endpoints
    Route::patch('events/{id}/toggle-publish', [EventController::class, 'togglePublish'])->name('events.toggle-publish');
    Route::patch('places/{id}/toggle-publish', [\App\Http\Controllers\PlaceController::class, 'togglePublish'])->name('places.toggle-publish');

    // Bulk action endpoints
    Route::post('events/bulk/delete', [EventController::class, 'bulkDelete'])->name('events.bulk-delete');
    Route::post('events/bulk/publish', [EventController::class, 'bulkPublish'])->name('events.bulk-publish');
    Route::post('places/bulk/delete', [\App\Http\Controllers\PlaceController::class, 'bulkDelete'])->name('places.bulk-delete');
    Route::post('places/bulk/publish', [\App\Http\Controllers\PlaceController::class, 'bulkPublish'])->name('places.bulk-publish');

    Route::get('/dashboard', [BookingController::class, 'adminDashboard'])->name('dashboard');
    Route::get('/analytics', [BookingController::class, 'adminAnalytics'])->name('analytics');
    Route::get('/orders', [BookingController::class, 'adminOrders'])->name('orders');
    // Admin order utilities
    Route::get('/orders/export', [BookingController::class, 'adminExportOrders'])->name('orders.export');
    Route::get('/orders/{id}', [BookingController::class, 'adminOrderShow'])->name('orders.show');
    Route::post('/orders/{id}/status', [BookingController::class, 'adminUpdateOrderStatus'])->name('orders.update_status');
    Route::get('/users', [BookingController::class, 'adminUsers'])->name('users');
    Route::get('/reports', [BookingController::class, 'adminReports'])->name('reports');
});

// Logout (POST)
use Illuminate\Support\Facades\Auth;
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');
