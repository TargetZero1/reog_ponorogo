<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\CacheInvalidationService;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_en',
        'slug',
        'description',
        'description_en',
        'date',
        'location',
        'location_en',
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

    protected static function booted()
    {
        // Clear caches when event is modified
        static::created(function () {
            CacheInvalidationService::onEventModified();
        });

        static::updated(function () {
            CacheInvalidationService::onEventModified();
        });

        static::deleted(function () {
            CacheInvalidationService::onEventModified();
        });
    }
}
