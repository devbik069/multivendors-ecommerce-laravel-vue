<?php

namespace App\Http\Controllers\Api\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\AuthResource;
use App\Http\Resources\User\WishlistResource;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProfileController extends Controller
{
    public function orders()
    {
        // $id = Auth::guard('user-api')->id();
        // $orders = User::where('id', $id)->first()->load('orders');

        $user = Auth::guard('user-api')->user();

        return WishlistResource::collection($user->orders()->orderBy('id', 'DESC')->paginate(5));
    }

    public function orderById(Order $order)
    {
        // return $order->items;
        return WishlistResource::make($order->load('items.product'));
    }

    public function updateProfile(Request $request)
    {
        $request->user()->fill($request->all());
        $request->user()->save();
        return AuthResource::make($request->user());
    }

    public function updatePassword(Request $request)
    {


        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return send_ms('password Updated Success', true, 200);
    }

    public function updateImage(Request $request)
    {
        if ($request->hasFile('image')) {
            // $manager = new ImageManager(new Driver());
            // $path = 'upload/user/';
            // $requestImage = $manager->read($request->file('image'));
            // $imgName = hexdec(uniqid()).'.'.$requestImage->getClientOriginalExtension();
            // return response($imgName)->json();
            // exit;
            // $requestImage->resize(300, 200);
            // $requestImage->save($path . $imgName);
            // $pathName = $path . $imgName;

            $image = $request->file('image');
            $manager = new ImageManager(new Driver());
            $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
            $img = $manager->read($image);
            $img = $img->resize(600,600);
            $img->save(base_path('public/upload/user/'.$name_gen));
            $save_url = 'upload/user/'.$name_gen;

            //old image delete
            @unlink(public_path($request->user()->image));
            $request->user()->update([
                'image' => $save_url
            ]); 

            return AuthResource::make($request->user());
        }
    }
}
