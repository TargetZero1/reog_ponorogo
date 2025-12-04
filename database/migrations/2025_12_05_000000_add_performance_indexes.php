<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add performance optimization indexes
     */
    public function up(): void
    {
        // Index for frequently queried columns in tickets
        Schema::table('tickets', function (Blueprint $table) {
            $table->index(['user_id']);
            $table->index(['payment_status']);
            $table->index(['created_at']);
            $table->index(['attraction_name']);
            $table->index(['visit_date']);
        });

        // Index for events queries
        Schema::table('events', function (Blueprint $table) {
            $table->index(['published']);
            $table->index(['date']);
            $table->index(['slug']);
            $table->index(['created_at']);
        });

        // Index for places queries
        Schema::table('places', function (Blueprint $table) {
            $table->index(['published']);
            $table->index(['slug']);
            $table->index(['category']);
            $table->index(['created_at']);
        });

        // Index for users queries
        Schema::table('users', function (Blueprint $table) {
            $table->index(['role']);
            $table->index(['email']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['payment_status']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['attraction_name']);
            $table->dropIndex(['visit_date']);
        });

        Schema::table('events', function (Blueprint $table) {
            $table->dropIndex(['published']);
            $table->dropIndex(['date']);
            $table->dropIndex(['slug']);
            $table->dropIndex(['created_at']);
        });

        Schema::table('places', function (Blueprint $table) {
            $table->dropIndex(['published']);
            $table->dropIndex(['slug']);
            $table->dropIndex(['category']);
            $table->dropIndex(['created_at']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['email']);
            $table->dropIndex(['created_at']);
        });
    }
};
