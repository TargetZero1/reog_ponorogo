<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;

class RegistrationToCheckoutFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_full_flow_register_then_checkout()
    {
        // Start by visiting the register page with attraction
        $registerResponse = $this->get('/pesan-ticket/register?attraction=Taman%20Wisata%20Ngembag');
        $registerResponse->assertStatus(200);

        // Register a new user
        $registerSubmitResponse = $this->post('/pesan-ticket/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'attraction' => 'Taman Wisata Ngembag',
        ]);

        // Should redirect to checkout
        $registerSubmitResponse->assertRedirect('/pesan-ticket/checkout?attraction=Taman+Wisata+Ngembag');

        // Now access the checkout page (should be authenticated after register)
        $checkoutResponse = $this->get('/pesan-ticket/checkout?attraction=Taman%20Wisata%20Ngembag');
        $checkoutResponse->assertStatus(200);
        $checkoutResponse->assertInertia(fn ($page) => $page
            ->has('csrf_token')
            ->has('attraction')
            ->has('pricePerTicket')
        );

        // Now submit the checkout form
        $visitDate = now()->addDay()->format('Y-m-d');
        $checkoutSubmitResponse = $this->post('/pesan-ticket/create', [
            'attraction' => 'Taman Wisata Ngembag',
            'quantity' => 2,
            'total_price' => 30000,
            'visit_date' => $visitDate,
        ]);

        // Should render confirmation (not 419 error)
        $checkoutSubmitResponse->assertStatus(200);
        $checkoutSubmitResponse->assertInertia(fn ($page) => $page
            ->component('Booking/Confirmation')
            ->has('ticket')
            ->has('whatsappUrl')
        );

        // Verify ticket was created
        $this->assertDatabaseHas('tickets', [
            'attraction_name' => 'Taman Wisata Ngembag',
            'quantity' => 2,
        ]);
    }
}
