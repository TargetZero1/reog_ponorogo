<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'category', 'description', 'location', 'hours', 'rating', 'image_path', 'price', 'highlights', 'activities', 'facilities', 'best_time', 'published'
    ];

    protected $casts = [
        'highlights' => 'array',
        'activities' => 'array',
        'facilities' => 'array',
        'published' => 'boolean',
        'rating' => 'decimal:2',
        'price' => 'decimal:2',
    ];
}
