<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('seller_id')->nullable();
            $table->unsignedBigInteger('brand_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('subcategory_id')->nullable();
            $table->string('name');
            $table->string('thumbnail');
            $table->string('slug')->unique();
            $table->json('images');
            $table->float('price',8,2)->default(0);
            $table->integer('discount')->default(0);
            $table->text('description')->nullable();
            $table->integer('stock')->default(0);
            $table->boolean('sale')->default(false);
            $table->enum('condition',['new','popular','winter','feature'])->default('new');
            $table->enum('added_by',['admin','seller'])->default('admin');
            $table->enum('status',['active','inactive'])->default('inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
