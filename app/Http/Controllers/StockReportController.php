<?php

namespace App\Http\Controllers;

use App\Models\ItemOutletOwnership;
use App\Models\Outlet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StockReportController extends Controller
{
    /**
     * Display the stock report for the selected outlet.
     */
    public function show(Request $request): Response
    {
        $requestedOutlet = $request->string('outlet')->trim();

        $outlet = Outlet::query()
            ->when($requestedOutlet->isNotEmpty(), function ($query) use ($requestedOutlet) {
                $query->where('nama', $requestedOutlet->value())
                    ->orWhere('kode_outlet', $requestedOutlet->value());
            })
            ->orderBy('nama')
            ->first();

        // Fallback to the first outlet if none matched or database empty.
        if (!$outlet) {
            $outlet = Outlet::query()->orderBy('nama')->first();
        }

        $stockItems = collect();

        if ($outlet) {
            $stockItems = ItemOutletOwnership::with('item')
                ->where('outlet_id', $outlet->id)
                ->get()
                ->filter(fn ($ownership) => $ownership->item) // guard against missing relations
                ->sortBy(fn ($ownership) => $ownership->item->nama)
                ->values()
                ->map(function ($ownership) {
                    return [
                        'id' => $ownership->item->id,
                        'name' => $ownership->item->nama,
                        'status' => $ownership->current_status,
                    ];
                });
        }

        return Inertia::render('StockReport', [
            'selectedOutlet' => $outlet?->nama ?? $requestedOutlet->value() ?? '',
            'stockItems' => $stockItems,
        ]);
    }
}
