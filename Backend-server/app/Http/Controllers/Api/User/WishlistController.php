<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\User\WishlistResource;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wishlists = Auth::guard('user-api')->user()->userWishlistProducts()->get();
        return WishlistResource::collection($wishlists);
    }

    public function store(Request $request)
    {

        $user = Auth::guard('user-api')->user();

        $count = $user->userWishlistProducts()->where('product_id', $request->product_id)->count();

        if ($count == 0) {
            //attach
            $user->userWishlistProducts()->attach($request->product_id);
            return send_ms('Attach Success', true, 201);
        } else {
            //detach
            $user->userWishlistProducts()->detach($request->product_id);
            return send_ms('Detach Success', true, 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function show(Wishlist $wishlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wishlist $wishlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Wishlist  $wishlist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Wishlist $wishlist)
    {
        //
    }
}
