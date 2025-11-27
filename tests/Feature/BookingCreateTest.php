<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Carbon\Carbon;

class BookingCreateTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_can_create_ticket_and_sees_confirmation()
    {
        $this->artisan('migrate');

        $user = User::factory()->create();

        $tomorrow = Carbon::now()->addDay()->format('Y-m-d');

        $response = $this->actingAs($user)->post('/pesan-ticket/create', [
            'attraction' => 'Grebeg Suro',
            'quantity' => 2,
            'total_price' => 0,
            'visit_date' => $tomorrow,
        ]);

        // Should render Confirmation page (200)
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Booking/Confirmation')
            ->has('ticket')
            ->has('whatsappUrl')
        );

        $this->assertDatabaseHas('tickets', [
            'user_id' => $user->id,
            'attraction_name' => 'Grebeg Suro',
            'quantity' => 2,
        ]);
    }
}
