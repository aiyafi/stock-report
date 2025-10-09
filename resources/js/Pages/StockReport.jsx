import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function StockReport({ selectedOutlet = 'Herald City' }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [formData, setFormData] = useState({
        outlet: selectedOutlet,
        baristaName: '',
        date: new Date().toISOString().split('T')[0],
    });

    // Sample stock items with initial status
    const [stockItems, setStockItems] = useState([
        { id: 1, name: 'Espresso Beans', status: 'Ready', action: null },
        { id: 2, name: 'Milk', status: 'Ready', action: null },
        { id: 3, name: 'Sugar', status: 'Ready', action: null },
        { id: 4, name: 'Caramel Syrup', status: 'Ready', action: null },
        { id: 5, name: 'Vanilla Syrup', status: 'Ready', action: null },
        { id: 6, name: 'Chocolate Powder', status: 'Ready', action: null },
        { id: 7, name: 'Whipped Cream', status: 'Ready', action: null },
        { id: 8, name: 'Paper Cups', status: 'Ready', action: null },
    ]);

    // Update form data when selectedOutlet prop changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, outlet: selectedOutlet }));
    }, [selectedOutlet]);

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time for display
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    // Handle outlet change
    const handleOutletChange = (e) => {
        setFormData({ ...formData, outlet: e.target.value });
    };

    // Handle barista name change
    const handleBaristaNameChange = (e) => {
        setFormData({ ...formData, baristaName: e.target.value });
    };

    // Handle date change
    const handleDateChange = (e) => {
        setFormData({ ...formData, date: e.target.value });
    };

    // Handle status change
    const handleStatusChange = (itemId, newStatus) => {
        setStockItems(
            stockItems.map((item) =>
                item.id === itemId
                    ? { ...item, status: newStatus, action: null }
                    : item
            )
        );
    };

    // Handle action button click
    const handleActionClick = (itemId, action) => {
        setStockItems(
            stockItems.map((item) =>
                item.id === itemId ? { ...item, action } : item
            )
        );
    };

    // Handle report submission
    const handleReport = () => {
        const reportData = {
            outlet: formData.outlet,
            baristaName: formData.baristaName,
            date: formData.date,
            timestamp: currentTime.toISOString(),
            items: stockItems.map((item) => ({
                barang: item.name,
                status: item.status,
                action: item.action || 'None',
            })),
        };

        console.log('=== STOCK REPORT ===');
        console.log(JSON.stringify(reportData, null, 2));
        console.log('===================');
    };

    return (
        <>
            <Head title="Barista Stock Report" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    
                    {/* Header Section with Clock */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                    Hi {formData.outlet} 👋
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    Let's check your stock for today.
                                </p>
                            </div>
                            <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-md">
                                <div className="text-3xl font-mono font-bold tracking-wider">
                                    {formatTime(currentTime)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Nama Outlet */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Outlet
                                </label>
                                <select
                                    value={formData.outlet}
                                    onChange={handleOutletChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                                >
                                    <option value="Warehouse">Warehouse</option>
                                    <option value="Outlet A">Outlet A</option>
                                    <option value="Outlet B">Outlet B</option>
                                </select>
                            </div>

                            {/* Nama Barista */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Barista
                                </label>
                                <input
                                    type="text"
                                    value={formData.baristaName}
                                    onChange={handleBaristaNameChange}
                                    placeholder="Nama Barista"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Tanggal */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={handleDateChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stock Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Barang
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stockItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={item.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={cn(
                                                        "px-3 py-2 border rounded-lg text-sm font-medium transition-all outline-none",
                                                        item.status === 'Ready'
                                                            ? 'border-green-300 bg-green-50 text-green-700 focus:ring-2 focus:ring-green-500'
                                                            : 'border-red-300 bg-red-50 text-red-700 focus:ring-2 focus:ring-red-500'
                                                    )}
                                                >
                                                    <option value="Ready">Ready</option>
                                                    <option value="Habis">Habis</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleActionClick(
                                                                item.id,
                                                                'Hampir Habis'
                                                            )
                                                        }
                                                        disabled={item.status === 'Habis'}
                                                        className={cn(
                                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                            item.status === 'Habis'
                                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                : item.action === 'Hampir Habis'
                                                                ? 'bg-yellow-500 text-white shadow-md'
                                                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:shadow-md'
                                                        )}
                                                    >
                                                        Hampir Habis
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleActionClick(
                                                                item.id,
                                                                'Habis'
                                                            )
                                                        }
                                                        disabled={item.status === 'Habis'}
                                                        className={cn(
                                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                            item.status === 'Habis'
                                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                : item.action === 'Habis'
                                                                ? 'bg-red-500 text-white shadow-md'
                                                                : 'bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-md'
                                                        )}
                                                    >
                                                        Habis
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Report Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleReport}
                            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-400"
                        >
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
