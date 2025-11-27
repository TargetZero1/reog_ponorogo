<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('events')) {
            Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->nullable()->unique();
            $table->text('description')->nullable();
            $table->timestamp('date')->nullable();
            $table->string('location')->nullable();
            $table->integer('capacity')->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->boolean('published')->default(false);
            $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
};
