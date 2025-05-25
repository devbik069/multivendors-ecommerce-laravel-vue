<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FilemanagerResource;
use App\Models\Admin;
use App\Models\File;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Facades\Image;


class FilemanagerController extends Controller
{


    public function upload(Request $request)
    {
       
        if ($request->hasFile('file')) {

            // $image = $request->file('file');
            // $imgName = $image->hashName();
            // $path = 'upload/files/';
            // Image::make($image)->resize(450, 450)->save($path . $imgName);
            // $dbFileName = $path . $imgName;

            $image = $request->file('file');
            $manager = new ImageManager(new Driver());
            $name_gen = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
            $img = $manager->read($image);
            $img = $img->resize(450,450);
            $img->save(base_path('public/upload/files/'.$name_gen));
            $dbFileName = 'upload/files/'.$name_gen;

            $admin = Admin::find($request->user()->id);
            $admin->files()->create([
                'file_original_name' => $image->getClientOriginalName(),
                'file_name' => $dbFileName,
                'extension' => $image->getClientOriginalExtension(),
                'file_size' => $image->getSize(),
            ]);

            return send_ms('Upload Success', true, 200);
        }
    }


    public function files()
    {
        $admin = Admin::find(request()->user()->id);
        return  FilemanagerResource::collection($admin->files()->latest()->paginate(14));
    }



    public function destory($id)
    {
        $file =  File::find($id);
        $file->delete();
        @unlink($file->file_name);

        return send_ms('Delete Success', true, 200);
    }
}
