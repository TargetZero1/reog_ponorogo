<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthBookingTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register_and_be_redirected_to_checkout_with_attraction()
    {
        // Ensure migrations run
        $this->artisan('migrate');

        $response = $this->post('/pesan-ticket/register', [
            'name' => 'Demo User',
            'email' => 'demo_user@test.local',
            'password' => 'secret123',
            'password_confirmation' => 'secret123',
            'attraction' => 'Grebeg Suro',
        ]);

        $response->assertRedirectContains('/pesan-ticket/checkout');

        $this->assertDatabaseHas('users', [
            'email' => 'demo_user@test.local',
            'name' => 'Demo User',
        ]);

        $this->assertTrue(auth()->check());
    }

    /** @test */
    public function existing_user_can_login_and_be_authenticated()
    {
        $this->artisan('migrate');

        $user = User::factory()->create([
            'email' => 'existing@test.local',
            'password' => bcrypt('password'),
        ]);

        $response = $this->post('/pesan-ticket/login', [
            'email' => 'existing@test.local',
            'password' => 'password',
        ]);

        $response->assertRedirect('/');
        $this->assertAuthenticatedAs($user);
    }
}
