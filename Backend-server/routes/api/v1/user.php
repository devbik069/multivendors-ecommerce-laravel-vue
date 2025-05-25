<?php

use App\Http\Controllers\Api\Admin\CouponController;
use App\Http\Controllers\Api\Admin\DivisionController;
use App\Http\Controllers\Api\User\AuthController;
use App\Http\Controllers\Api\user\ProfileController;
use App\Http\Controllers\Api\User\WishlistController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function(){
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});




Route::middleware('auth:user-api')->group(function(){
    Route::controller(AuthController::class)->group(function(){
        Route::post('/logout', 'logout');
        Route::get('/me', 'user');
        Route::get('/address', 'address');
        Route::post('/address/store', 'addressStore');
    });

    Route::controller(DivisionController::class)->group(function () {
        Route::get('divisions', 'index');
        Route::get('district/{division}',  'districtById');
    });

    Route::apiResources([
        'wishlists' => WishlistController::class,
    ]);

    Route::post('/apply-coupon', [CouponController::class, 'apply']);

    Route::controller(ProfileController::class)->group(function () {

        Route::get('/orders', 'orders');
        Route::get('/order/{order}',  'orderById');
        Route::post('/profile-update',  'updateProfile');
        Route::post('/image-update',  'updateImage');
        Route::put('/password-update',  'updatePassword');
    });
});