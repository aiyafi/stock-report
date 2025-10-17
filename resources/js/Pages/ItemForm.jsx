import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ItemForm({ item = null, kategoris = [], outlets = [], mode = 'create' }) {
    const { data, setData, post, put, processing, errors } = useForm({
        nama: item?.nama || '',
        kategori_id: item?.kategori_id || '',
        outlet_ids: item?.outlets?.map(outlet => outlet.id) || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === 'edit') {
            put(`/items/${item.id}`);
        } else {
            post('/items');
        }
    };

    const handleOutletToggle = (outletId) => {
        setData(current => ({
            ...current,
            outlet_ids: current.outlet_ids.includes(outletId)
                ? current.outlet_ids.filter(id => id !== outletId)
                : [...current.outlet_ids, outletId],
        }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {mode === 'edit' ? 'Edit Item' : 'Add New Item'}
                </h2>
            }
        >
            <Head title={mode === 'edit' ? 'Edit Item' : 'Add Item'} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg border">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">
                                {mode === 'edit' ? 'Edit Item Details' : 'Item Information'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Nama Item */}
                            <div>
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Item
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter item name"
                                />
                                {errors.nama && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nama}</p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div>
                                <label htmlFor="kategori_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori
                                </label>
                                <select
                                    id="kategori_id"
                                    value={data.kategori_id}
                                    onChange={(e) => setData('kategori_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select a category</option>
                                    {kategoris.map(kategori => (
                                        <option key={kategori.id} value={kategori.id}>
                                            {kategori.nama}
                                        </option>
                                    ))}
                                </select>
                                {errors.kategori_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.kategori_id}</p>
                                )}
                            </div>

                            {/* Outlet Assignment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Assign to Outlets
                                </label>
                                <div className="space-y-3">
                                    {outlets.map(outlet => (
                                        <label key={outlet.id} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.outlet_ids.includes(outlet.id)}
                                                onChange={() => handleOutletToggle(outlet.id)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {outlet.icon} {outlet.nama}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {errors.outlet_ids && (
                                    <p className="mt-1 text-sm text-red-600">{errors.outlet_ids}</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {processing ? 'Saving...' : (mode === 'edit' ? 'Update Item' : 'Save Item')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
