<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'attraction_name',
        'quantity',
        'visit_date',
        'total_price',
        'payment_status',
        'ticket_type',
        'source_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'source_id');
    }

    public function place()
    {
        return $this->belongsTo(Place::class, 'source_id');
    }
}
