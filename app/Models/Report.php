<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    protected $table = 'report';

    protected $fillable = [
        'outlet_id',
        'barista_name',
        'shift_id',
        'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    /**
     * Get the outlet that owns the report.
     */
    public function outlet(): BelongsTo
    {
        return $this->belongsTo(Outlet::class);
    }

    /**
     * Get the shift associated with the report.
     */
    public function shift(): BelongsTo
    {
        return $this->belongsTo(JadwalShift::class, 'shift_id');
    }

    /**
     * Get the report lines for the report.
     */
    public function lines(): HasMany
    {
        return $this->hasMany(ReportLine::class);
    }
}

