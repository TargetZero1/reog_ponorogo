<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        $title = $this->faker->sentence(3);
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $this->faker->paragraphs(2, true),
            'date' => $this->faker->dateTimeBetween('now', '+60 days'),
            'location' => $this->faker->city(),
            'capacity' => $this->faker->numberBetween(50, 1000),
            'price' => $this->faker->randomFloat(2, 0, 50000),
            'image_path' => null,
            'published' => true,
        ];
    }
}
