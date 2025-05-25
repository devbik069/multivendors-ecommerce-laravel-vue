<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Seller;
use App\Models\Subcategory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $mImgs = ["upload/products/" . $this->faker->numberBetween(1, 5) . ".jpg", "upload/products/" . $this->faker->numberBetween(5, 10) . ".jpg", "upload/products/" . $this->faker->numberBetween(10, 20) . ".jpg"];

        $thumbnail = "upload/products/".$this->faker->numberBetween(1,15).".jpg";
        return [
            'seller_id' => $this->faker->randomElement(Seller::pluck('id')->toArray()),
            'brand_id' => $this->faker->randomElement(Brand::pluck('id')->toArray()),
            'category_id' => $this->faker->randomElement(Category::pluck('id')->toArray()),
            'subcategory_id' => $this->faker->randomElement(Subcategory::pluck('id')->toArray()),
            'name' => $this->faker->name(),
            'thumbnail' => $thumbnail,
            'slug' => $this->faker->unique()->slug(),
            'images' => $this->faker->randomElement([$mImgs]),
            'price' => $this->faker->numberBetween(800, 3000),
            'discount' => $this->faker->numberBetween(1, 99),
            'description' => $this->faker->paragraph(),
            'stock' => $this->faker->numberBetween(1, 99),
            'sale' => $this->faker->randomElement([true, false]),
            'condition' => $this->faker->randomElement(['new', 'popular', 'winter', 'feature']),
            'added_by' => $this->faker->randomElement(['admin', 'seller']),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
