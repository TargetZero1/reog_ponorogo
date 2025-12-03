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

// 1. HOME (Added Name)
Route::get('/', function () {
    return Inertia::render('App');
})->name('home');

// 2. BUDAYA (Added Name)
Route::get('/budaya-dan-sejarah', function () {
    return Inertia::render('BudayaDanSejarah');
})->name('budaya');

// 3. PLACES INDEX (Added Name)
Route::get('/tempat-wisata', function () {
    $places = Place::where('published', true)->orderBy('name')->get();
    return Inertia::render('TempatWisata', [
        'places' => $places,
    ]);
})->name('places.index');

// 4. EVENTS INDEX (Added Name)
Route::get('/events', function () {
    $events = Event::where('published', true)
        ->where('date', '>=', now())
        ->orderBy('date', 'asc')
        ->paginate(12);
    return Inertia::render('Events/PublicIndex', [
        'events' => $events,
    ]);
})->name('events.index');

// 5. EVENTS SHOW (Public - only published events)
Route::get('/events/{slug}', function ($slug) {
    $event = Event::where('slug', $slug)
        ->where('published', true)
        ->firstOrFail();
    return Inertia::render('Events/Show', [
        'event' => $event,
    ]);
})->name('events.show');

// --- Booking & Auth Routes (Kept existing names) ---
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
    FacadesAuth::setUser($user);
    return redirect()->back()->with('success', 'Profil berhasil diperbarui.');
})->middleware('auth')->name('profile.update');

// --- Admin Routes ---
Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
    Route::resource('events', EventController::class);
    Route::resource('places', \App\Http\Controllers\PlaceController::class);
    
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

// Logout
use Illuminate\Support\Facades\Auth;
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->name('logout');