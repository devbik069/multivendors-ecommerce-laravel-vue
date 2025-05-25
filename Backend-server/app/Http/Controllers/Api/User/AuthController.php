<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Resources\User\AuthResource;
use App\Http\Resources\User\WishlistResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'phone' => ['The provided credentials are incorrect.'],
                'password' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $this->makeToken($user);
    }

    public function register(RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'password' => Hash::make($request->input('password')),
        ]);

        return $this->makeToken($user);
    }

    public function makeToken($user)
    {
        $wishlists = $user->userWishlistProducts()->get();
        $token = $user->createToken('user-token')->plainTextToken;

        return (new AuthResource($user))
            ->additional(['meta' => [
                'token' => $token,
                'token_type' => 'Bearer',
                'wishlists' => $wishlists,
            ]]);
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return send_ms('User Logout', true, 200);
    }

    public function user(Request $request)
    {
        return AuthResource::make($request->user());
    }

    public function addressStore(Request $request)
    {
        $request->user()->update([
            'division_id' => $request->division_id,
            'district_id' => $request->district_id,
            'address' => $request->address,
        ]);

        return send_ms('Address Saved', true, 201);
    }

    public function address(Request $request)
    {
        $id = Auth::guard('user-api')->id();

        $data = User::where('id', $id)->select('division_id', 'district_id', 'address')->with([
            'division' => function ($query) {
                $query->select('id', 'name', 'charge');
            },
            'district' => function ($query) {
                $query->select('id', 'name');
            }
        ])->first();


        return WishlistResource::make($data);
    }
}
