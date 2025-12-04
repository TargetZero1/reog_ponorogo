<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\CacheInvalidationService;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'name_en', 'slug', 'category', 'category_en', 'description', 'description_en', 'location', 'location_en', 'hours', 'rating', 'image_path', 'price', 'highlights', 'activities', 'facilities', 'best_time', 'published'
    ];

    protected $casts = [
        'highlights' => 'array',
        'activities' => 'array',
        'facilities' => 'array',
        'published' => 'boolean',
        'rating' => 'decimal:2',
        'price' => 'decimal:2',
    ];

    protected static function booted()
    {
        // Clear caches when place is modified
        static::created(function () {
            CacheInvalidationService::onPlaceModified();
        });

        static::updated(function () {
            CacheInvalidationService::onPlaceModified();
        });

        static::deleted(function () {
            CacheInvalidationService::onPlaceModified();
        });
    }
}
