<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Carbon\Carbon;

class CsrfTokenTest extends TestCase
{
    use RefreshDatabase;

    public function test_csrf_token_is_shared_in_checkout_page()
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->get('/pesan-ticket/checkout?attraction=Taman%20Wisata%20Ngembag');
        
        // Check if csrf_token is in the props
        $response->assertInertia(fn ($page) => $page
            ->has('csrf_token')
            ->has('attraction')
            ->has('pricePerTicket')
        );
    }

    public function test_checkout_form_with_valid_csrf_token()
    {
        $user = User::factory()->create();
        
        // First get the checkout page to get the token
        $checkoutResponse = $this->actingAs($user)->get('/pesan-ticket/checkout?attraction=Taman%20Wisata%20Ngembag');
        
        $visitDate = now()->addDay()->format('Y-m-d');
        
        // Submit the form
        $submitResponse = $this->actingAs($user)->post('/pesan-ticket/create', [
            'attraction' => 'Taman Wisata Ngembag',
            'quantity' => 2,
            'total_price' => 30000,
            'visit_date' => $visitDate,
        ]);

        // Should not get 419 error
        $submitResponse->assertStatus(200);
        $submitResponse->assertInertia(fn ($page) => $page->component('Booking/Confirmation'));
    }
}
