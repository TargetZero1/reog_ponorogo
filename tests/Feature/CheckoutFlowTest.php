<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CheckoutFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_checkout_page_requires_authentication()
    {
        $response = $this->get('/pesan-ticket/checkout?attraction=Taman%20Wisata%20Ngembag');
        $response->assertRedirect(route('pesan.register', ['attraction' => 'Taman Wisata Ngembag']));
    }

    public function test_authenticated_user_can_view_checkout()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/pesan-ticket/checkout?attraction=Taman%20Wisata%20Ngembag');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Booking/Checkout')
            ->has('attraction')
            ->has('pricePerTicket')
        );
    }

    public function test_checkout_form_post_creates_ticket_and_renders_confirmation()
    {
        $user = User::factory()->create();
        
        $visitDate = now()->addDay()->format('Y-m-d');
        
        $response = $this->actingAs($user)->post('/pesan-ticket/create', [
            'attraction' => 'Taman Wisata Ngembag',
            'quantity' => 2,
            'total_price' => 30000,
            'visit_date' => $visitDate,
        ]);

        // Should render Confirmation page with whatsappUrl
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Booking/Confirmation')
            ->has('ticket')
            ->has('whatsappUrl')
        );

        // Verify ticket was created in database
        $this->assertDatabaseHas('tickets', [
            'user_id' => $user->id,
            'attraction_name' => 'Taman Wisata Ngembag',
            'quantity' => 2,
            'total_price' => 30000,
        ]);
    }

    public function test_checkout_form_validates_required_fields()
    {
        $user = User::factory()->create();
        
        // Missing visit_date
        $response = $this->actingAs($user)->post('/pesan-ticket/create', [
            'attraction' => 'Taman Wisata Ngembag',
            'quantity' => 2,
            'total_price' => 30000,
            'visit_date' => '',
        ]);

        $response->assertSessionHasErrors('visit_date');
    }

    public function test_checkout_form_validates_visit_date_must_be_future()
    {
        $user = User::factory()->create();
        
        // Visit date in the past
        $response = $this->actingAs($user)->post('/pesan-ticket/create', [
            'attraction' => 'Taman Wisata Ngembag',
            'quantity' => 2,
            'total_price' => 30000,
            'visit_date' => now()->subDay()->format('Y-m-d'),
        ]);

        $response->assertSessionHasErrors('visit_date');
    }
}
