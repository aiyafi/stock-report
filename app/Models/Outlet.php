<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Outlet extends Model
{
    protected $table = 'outlet';

    protected $fillable = [
        'nama',
        'kode_outlet',
        'icon',
    ];

    /**
     * Get the items that belong to this outlet.
     */
    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class, 'item_outlet_ownership')
            ->withPivot('current_status')
            ->withTimestamps();
    }

    /**
     * Get the reports for the outlet.
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}

