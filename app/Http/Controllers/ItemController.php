<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Kategori;
use App\Models\Outlet;
use App\Models\ItemOutletOwnership;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    /**
     * Display a listing of items.
     */
    public function index(): Response
    {
        $items = Item::with(['kategori', 'outlets'])->get();
        $kategoris = Kategori::all();
        $outlets = Outlet::all();

        return Inertia::render('Dashboard', [
            'items' => $items,
            'kategoris' => $kategoris,
            'outlets' => $outlets,
        ]);
    }

    /**
     * Show the form for creating a new item.
     */
    public function create(): Response
    {
        $kategoris = Kategori::all();
        $outlets = Outlet::all();

        return Inertia::render('ItemForm', [
            'kategoris' => $kategoris,
            'outlets' => $outlets,
            'mode' => 'create',
        ]);
    }

    /**
     * Store a newly created item.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategori,id',
            'outlet_ids' => 'array',
            'outlet_ids.*' => 'exists:outlet,id',
        ]);

        // Create the item
        $item = Item::create([
            'nama' => $request->nama,
            'kategori_id' => $request->kategori_id,
        ]);

        // Create ownership relationships
        if ($request->has('outlet_ids')) {
            foreach ($request->outlet_ids as $outletId) {
                ItemOutletOwnership::create([
                    'item_id' => $item->id,
                    'outlet_id' => $outletId,
                    'current_status' => 'READY',
                ]);
            }
        }

        return redirect()->route('dashboard')->with('success', 'Item created successfully!');
    }

    /**
     * Show the form for editing the specified item.
     */
    public function edit(Item $item): Response
    {
        $kategoris = Kategori::all();
        $outlets = Outlet::all();
        $item->load(['kategori', 'outlets']);

        return Inertia::render('ItemForm', [
            'item' => $item,
            'kategoris' => $kategoris,
            'outlets' => $outlets,
            'mode' => 'edit',
        ]);
    }

    /**
     * Update the specified item.
     */
    public function update(Request $request, Item $item): RedirectResponse
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategori,id',
            'outlet_ids' => 'array',
            'outlet_ids.*' => 'exists:outlet,id',
        ]);

        // Update the item
        $item->update([
            'nama' => $request->nama,
            'kategori_id' => $request->kategori_id,
        ]);

        // Update ownership relationships
        // First, remove all existing relationships
        ItemOutletOwnership::where('item_id', $item->id)->delete();

        // Then create new ones
        if ($request->has('outlet_ids')) {
            foreach ($request->outlet_ids as $outletId) {
                ItemOutletOwnership::create([
                    'item_id' => $item->id,
                    'outlet_id' => $outletId,
                    'current_status' => 'READY',
                ]);
            }
        }

        return redirect()->route('dashboard')->with('success', 'Item updated successfully!');
    }

    /**
     * Remove the specified item.
     */
    public function destroy(Item $item): RedirectResponse
    {
        // Delete ownership relationships first
        ItemOutletOwnership::where('item_id', $item->id)->delete();
        
        // Then delete the item
        $item->delete();

        return redirect()->route('dashboard')->with('success', 'Item deleted successfully!');
    }
}
