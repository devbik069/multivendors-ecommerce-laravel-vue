<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\OrderResource;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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


        $order = Order::create([
            'user_id' => $id,
            'order_number' => mt_rand(100000, 999999),
            'shipping_address' => $data->division->name . ',' . $data->district->name . ',' . $data->address,
            'payment_type' => 'cash',
            'subtotal' => $request->subtotal,
            'discount' => $request->discount,
            'charges' => $data->division->charge,
            'total' => $request->total,
            'status' => 'inactive'
        ]);

        foreach ($request->items as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'price' => $item['price'],
                'qty' => $item['quantity'],
            ]);
        }

        return OrderResource::make($order);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
