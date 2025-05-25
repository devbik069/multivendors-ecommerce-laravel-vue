<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $casts = [
        'images' => 'json',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeStatus($query, $status)
    {
        $query->where('status', $status);
    }

    public function scopeConditions($query, $type)
    {
        $query->where('condition', $type);
    }

    public function scopeSold($query)
    {
        $query->where('sale', 1);
    }

    public function scopePublished($query)
    {
        $query->where('status', 'active');
    }

    public function wishlistUsers()
    {
        return $this->belongsToMany(User::class, 'wishlists')->withTimestamps();
    }
    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
