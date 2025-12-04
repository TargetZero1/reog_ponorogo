<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add English translation fields to events table
        Schema::table('events', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->text('description_en')->nullable()->after('description');
            $table->string('location_en')->nullable()->after('location');
        });

        // Add English translation fields to places table
        Schema::table('places', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->text('description_en')->nullable()->after('description');
            $table->string('location_en')->nullable()->after('location');
            $table->string('category_en')->nullable()->after('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'description_en', 'location_en']);
        });

        Schema::table('places', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en', 'location_en', 'category_en']);
        });
    }
};
