<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    public function scopeStatus($query, $status)
    {
        $query->where('status', $status);
    }

    public function products()
    {
        return $this->hasMany(Product::class)->where('status', 'active');
    }
}
