import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const STATUS_MAP = {
    READY: {
        label: "Ready",
        style: "border-green-300 bg-green-50 text-green-700",
        badge: "bg-green-100 text-green-700",
    },
    ALMOST_OUT: {
        label: "Hampir Habis",
        style: "border-yellow-300 bg-yellow-50 text-yellow-700",
        badge: "bg-yellow-100 text-yellow-700",
    },
    OUT: {
        label: "Habis",
        style: "border-red-300 bg-red-50 text-red-700",
        badge: "bg-red-100 text-red-700",
    },
};

export default function StockReport({
    selectedOutlet = "",
    stockItems: initialStockItems = [],
}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [formData, setFormData] = useState({
        outlet: selectedOutlet || "",
        baristaName: "",
        date: new Date().toISOString().split("T")[0],
    });
    const [stockItems, setStockItems] = useState(() =>
        initialStockItems.map((item) => ({
            ...item,
            action: null,
        })),
    );

    // Sync outlet selection
    useEffect(() => {
        setFormData((prev) => ({ ...prev, outlet: selectedOutlet || "" }));
    }, [selectedOutlet]);

    // Sync stock data from server
    useEffect(() => {
        setStockItems(
            initialStockItems.map((item) => ({
                ...item,
                action: null,
            })),
        );
    }, [initialStockItems]);

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time for display
    const formatTime = (date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
    };

    // Handle barista name change
    const handleBaristaNameChange = (e) => {
        setFormData({ ...formData, baristaName: e.target.value });
    };

    // Handle date change
    const handleDateChange = (e) => {
        setFormData({ ...formData, date: e.target.value });
    };

    // Handle action button click with toggle functionality
    const handleActionClick = (itemId, action) => {
        setStockItems((items) =>
            items.map((item) => {
                if (item.id === itemId) {
                    // Toggle: if the same action is clicked, unselect it
                    return {
                        ...item,
                        action: item.action === action ? null : action,
                    };
                }
                return item;
            }),
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
                status: STATUS_MAP[item.status]?.label ?? item.status,
                action: item.action || "None",
            })),
        };

        console.log("=== STOCK REPORT ===");
        console.log(JSON.stringify(reportData, null, 2));
        console.log("===================");
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
                                    {stockItems.map((item) => {
                                        const statusMeta = STATUS_MAP[
                                            item.status
                                        ] || {
                                            label: item.status,
                                            badge: "bg-gray-100 text-gray-700",
                                        };

                                        return (
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
                                                    <span
                                                        className={cn(
                                                            "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                                                            statusMeta.badge,
                                                        )}
                                                    >
                                                        {statusMeta.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        {/* Hampir Habis Button */}
                                                        <button
                                                            onClick={() =>
                                                                handleActionClick(
                                                                    item.id,
                                                                    "Hampir Habis",
                                                                )
                                                            }
                                                            disabled={
                                                                item.status ===
                                                                "OUT"
                                                            }
                                                            className={cn(
                                                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                                item.status ===
                                                                    "OUT"
                                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                                    : item.action ===
                                                                        "Hampir Habis"
                                                                      ? "bg-yellow-500 text-white shadow-md ring-2 ring-yellow-300"
                                                                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md",
                                                            )}
                                                        >
                                                            Hampir Habis
                                                        </button>

                                                        {/* Habis Button */}
                                                        <button
                                                            onClick={() =>
                                                                handleActionClick(
                                                                    item.id,
                                                                    "Habis",
                                                                )
                                                            }
                                                            disabled={
                                                                item.status ===
                                                                "OUT"
                                                            }
                                                            className={cn(
                                                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                                item.status ===
                                                                    "OUT"
                                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                                    : item.action ===
                                                                        "Habis"
                                                                      ? "bg-red-500 text-white shadow-md ring-2 ring-red-300"
                                                                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md",
                                                            )}
                                                        >
                                                            Habis
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
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
