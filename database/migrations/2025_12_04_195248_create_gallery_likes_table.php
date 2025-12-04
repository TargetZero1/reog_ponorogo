<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('gallery_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('photo_id');
            $table->timestamps();
            
            // Ensure a user can only like a photo once
            $table->unique(['user_id', 'photo_id']);
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('gallery_likes');
    }
};
