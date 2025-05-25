<?php

namespace App\Http\Controllers\Api\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\SellerApplyStore;
use App\Http\Resources\Seller\SellerResource;
use App\Models\Seller;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    public function index(Request $request)
    {
        $sellers = Seller::latest()->withCount('products')->paginate($request->show);
        return SellerResource::collection($sellers);
    }

    public function sellerProducts(Seller $slug, Request $request)
    {
        try {
            // return new SellerResource($slug);

            $sort = $request->input('sort');

            if ($sort == 'default') {
                $products = $slug->products()->paginate($request->show);
            } else {
                $products = $slug->products()->conditions($sort)->paginate($request->show);
            }

            return (new SellerResource($slug))
                ->additional(['products' => $products]);
            // return response()->json($slug);
        } catch (\Exception $e) {
            return send_ms($e->getMessage(), false, (int)$e->getCode());
        }
    }

    public function sellerApply(SellerApplyStore $request)
    {
        Seller::create($request->validated());
        return send_ms("Seller Created", true, 200);
    }
}
