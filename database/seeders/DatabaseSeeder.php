<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\EventSeeder;
use Database\Seeders\PlaceSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@reog.test'],
            [
                'name' => 'Admin Reog',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]
        );

        // Create or find test user (avoid duplicate errors)
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'role' => 'user',
            ]
        );

        // Create additional demo users
        User::factory(5)->create();

        // Seed example events
        $this->call(EventSeeder::class);
        
        // Seed places (tourist attractions)
        $this->call(PlaceSeeder::class);
    }
}
