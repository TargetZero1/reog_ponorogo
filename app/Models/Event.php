<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'date',
        'location',
        'capacity',
        'price',
        'image_path',
        'published',
    ];

    protected $casts = [
        'date' => 'datetime',
        'price' => 'decimal:2',
        'published' => 'boolean',
    ];
}
