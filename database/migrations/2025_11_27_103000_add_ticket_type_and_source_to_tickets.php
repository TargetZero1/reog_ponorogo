<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('tickets', function (Blueprint $table) {
            if (!Schema::hasColumn('tickets', 'ticket_type')) {
                $table->string('ticket_type')->nullable()->after('attraction_name');
            }
            if (!Schema::hasColumn('tickets', 'source_id')) {
                $table->unsignedBigInteger('source_id')->nullable()->after('ticket_type');
            }
        });
    }

    public function down()
    {
        Schema::table('tickets', function (Blueprint $table) {
            if (Schema::hasColumn('tickets', 'source_id')) {
                $table->dropColumn('source_id');
            }
            if (Schema::hasColumn('tickets', 'ticket_type')) {
                $table->dropColumn('ticket_type');
            }
        });
    }
};
