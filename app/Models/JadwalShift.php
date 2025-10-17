<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalShift extends Model
{
    protected $table = 'jadwal_shift';
    
    protected $fillable = [
        'id_jam',
        'id_tipe_pekerjaan',
        'id_outlet',
        'tanggal',
        'id_user',
        'status',
        'check_in_time',
        'check_out_time',
        'task',
        'task_status'
    ];

    protected $casts = [
        'tanggal' => 'date',
        'check_in_time' => 'datetime',
        'check_out_time' => 'datetime',
    ];
}

