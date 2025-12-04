<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;
use App\Models\Place;
use App\Models\Ticket;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all existing users (exclude admin)
        $users = User::where('role', 'user')->get();

        if ($users->isEmpty()) {
            $this->command->warn('No users found to create orders for');
            return;
        }

        // Get actual events and places from database
        $events = Event::where('published', true)->get();
        $places = Place::where('published', true)->get();

        // Combine attractions from events and places
        $attractions = [];
        
        foreach ($events as $event) {
            $attractions[] = [
                'name' => $event->name,
                'price' => $event->price ?? 50000,
            ];
        }

        foreach ($places as $place) {
            $attractions[] = [
                'name' => $place->name,
                'price' => $place->price ?? 30000,
            ];
        }

        // If no attractions found, use defaults
        if (empty($attractions)) {
            $attractions = [
                ['name' => 'Pertunjukan Reog Ponorogo', 'price' => 100000],
                ['name' => 'Wayang Kulit', 'price' => 75000],
                ['name' => 'Telaga Ngebel Tour', 'price' => 50000],
                ['name' => 'Kerajinan Topeng', 'price' => 40000],
            ];
        }

        $statuses = ['pending', 'completed', 'cancelled', 'refunded'];
        $orderCount = 0;

        // Create 3-5 orders per user with various statuses
        foreach ($users as $user) {
            $ordersPerUser = rand(3, 5);
            
            for ($i = 0; $i < $ordersPerUser; $i++) {
                $attraction = $attractions[array_rand($attractions)];
                $quantity = rand(1, 6);
                $totalPrice = $attraction['price'] * $quantity;
                $status = $statuses[array_rand($statuses)];
                
                Ticket::create([
                    'user_id' => $user->id,
                    'attraction_name' => $attraction['name'],
                    'quantity' => $quantity,
                    'total_price' => $totalPrice,
                    'visit_date' => now()->addDays(rand(1, 60))->format('Y-m-d'),
                    'payment_status' => $status,
                    'created_at' => now()->subDays(rand(0, 45)),
                    'updated_at' => now()->subDays(rand(0, 40)),
                ]);

                $orderCount++;
            }
        }

        $this->command->info("✓ OrderSeeder: Created {$orderCount} sample orders for {$users->count()} users");
        $this->command->info("✓ Used {$this->countAttractions($attractions)} different attractions with real prices");
    }

    private function countAttractions($attractions)
    {
        return count(array_unique(array_column($attractions, 'name')));
    }
}
