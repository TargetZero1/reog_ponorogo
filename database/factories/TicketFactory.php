<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => null,
            'attraction_name' => $this->faker->word(),
            'quantity' => $this->faker->numberBetween(1, 10),
            'visit_date' => $this->faker->dateTimeBetween('now', '+30 days'),
            'total_price' => $this->faker->randomFloat(2, 0, 100000),
            'payment_status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
        ];
    }
}
