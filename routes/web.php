<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockReportController;
use App\Models\Outlet;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Get outlets from our new outlet table
    $outlets = Outlet::orderBy('nama')
        ->get()
        ->map(function($outlet) {
            return [
                'id' => $outlet->kode_outlet,
                'name' => $outlet->nama,
                'icon' => $outlet->icon,
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'outlets' => $outlets,
    ]);
});

Route::get('/stock-report', [StockReportController::class, 'show'])
    ->name('stock-report');

Route::get('/dashboard', [App\Http\Controllers\ItemController::class, 'index'])->middleware(['auth', 'verified', 'role:manager'])->name('dashboard');

// Item management routes
Route::middleware(['auth', 'verified', 'role:manager'])->group(function () {
    Route::get('/items/create', [App\Http\Controllers\ItemController::class, 'create'])->name('items.create');
    Route::post('/items', [App\Http\Controllers\ItemController::class, 'store'])->name('items.store');
    Route::get('/items/{item}/edit', [App\Http\Controllers\ItemController::class, 'edit'])->name('items.edit');
    Route::put('/items/{item}', [App\Http\Controllers\ItemController::class, 'update'])->name('items.update');
    Route::delete('/items/{item}', [App\Http\Controllers\ItemController::class, 'destroy'])->name('items.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
