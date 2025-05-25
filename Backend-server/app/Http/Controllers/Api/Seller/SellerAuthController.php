<?php

namespace App\Http\Controllers\Api\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\SellerLoginRequest;
use App\Http\Resources\Seller\SellerAuthResource;
use App\Models\Seller;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SellerAuthController extends Controller
{
    public function login(SellerLoginRequest $request){

        $seller = Seller::where('email', $request->email)->first();

        
        if(!$seller || !Hash::check($request->password, $seller->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
                'password' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $this->makeToken($seller);



    }

    public function makeToken($seller)
    {
        $token = $seller->createToken('seller-token')->plainTextToken;

        // return (new AdminAuthResource($admin))
        //         ->additional(['meta' => [
        //             'token' => $token,
        //             'token_type' => 'Bearer'
        //         ]]);

        return SellerAuthResource::make([
            'user' => [
                'name' => $seller->name,
                'email' => $seller->email,
                'phone' => $seller->phone,
            ],
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return send_ms('Seller Logout',true,200);
    }

    public function user(Request $request)
    {
        return SellerAuthResource::make($request->user());
    }

}
