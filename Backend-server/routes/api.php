<?php

use App\Http\Controllers\Api\Admin\BrandController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\DistictController;
use App\Http\Controllers\Api\Admin\DivisionController;
use App\Http\Controllers\Api\Admin\OrderController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\SliderController;
use App\Http\Controllers\Api\Seller\SellerController;
use App\Http\Controllers\Api\ShopConroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function(){
    Route::get('sliders',[SliderController::class, 'index']);
    Route::get('brands',[BrandController::class, 'index']);
    Route::get('categories',[CategoryController::class, 'index']);
    Route::get('nav-categories',[CategoryController::class, 'navCats']);
    Route::get('products',[ProductController::class, 'index']);
    Route::get('/single-product/{slug}', [ProductController::class, 'productBySlug']);
    Route::get('divisions',[DivisionController::class, 'index']);
    Route::get('district/{division}',[DivisionController::class, 'districtById']);
    Route::get('sellers',[SellerController::class, 'index']);
    Route::get('shop-products',[ShopConroller::class, 'index']);
    Route::get('shop-sidebar',[ShopConroller::class, 'shopSidebar']);
    Route::get('sellers/products/{slug}', [SellerController::class, 'sellerProducts']);
    Route::post('/order-place', [OrderController::class, 'store']);

});
