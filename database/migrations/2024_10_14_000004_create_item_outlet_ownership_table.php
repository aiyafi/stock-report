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
        Schema::create('item_outlet_ownership', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained('item')->onDelete('cascade');
            $table->foreignId('outlet_id')->constrained('outlet')->onDelete('cascade');
            $table->enum('current_status', ['READY', 'ALMOST_OUT', 'OUT'])->default('READY');
            $table->timestamps();
            
            // Ensure unique combination of item and outlet
            $table->unique(['item_id', 'outlet_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_outlet_ownership');
    }
};

