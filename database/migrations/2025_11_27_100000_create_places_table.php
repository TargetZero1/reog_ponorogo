<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->nullable()->unique();
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->string('hours')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->string('image_path')->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->json('highlights')->nullable();
            $table->json('activities')->nullable();
            $table->json('facilities')->nullable();
            $table->string('best_time')->nullable();
            $table->boolean('published')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('places');
    }
};
