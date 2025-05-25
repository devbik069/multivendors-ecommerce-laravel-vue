<?php

 function send_ms($msg, $status, $code)
 {
    $res = [
        'status' => $status,
        'message' => $msg,
    ];

    return response()->json($res, $code);
 }

 if (!function_exists('product_count_upto_zero')) {

    function product_count_upto_zero($data)
    {
        return $data->where('products_count', '>', 0);
    }
}

?>
