import { Head, router, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [clickAnimation, setClickAnimation] = useState(null);

    // Sample outlet data - matching the StockReport options
    const outlets = [
        { id: 1, name: "Warehouse", icon: "🏢" },
        { id: 2, name: "Outlet A", icon: "🏬" },
        { id: 3, name: "Outlet B", icon: "🏭" },
    ];

    const handleOutletClick = (outletId) => {
        setSelectedOutlet(outletId);
        setClickAnimation(outletId);
        setTimeout(() => setClickAnimation(null), 200);
    };

    const handleContinue = () => {
        if (selectedOutlet) {
            const outlet = outlets.find((o) => o.id === selectedOutlet);
            router.visit(
                `/stock-report?outlet=${encodeURIComponent(outlet.name)}`
            );
        }
    };

    return (
        <>
            <Head title="Welcome" />

            {/* Full screen container with gradient background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
                {/* Main card container */}
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 md:p-12">
                    {/* Dashboard button - always visible, backend handles authorization */}
                    <div className="flex justify-end mb-4">
                        <Link
                            href="/dashboard"
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors group"
                        >
                            <svg
                                className="w-4 h-4 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Dashboard
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            Select Outlet
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base">
                            Choose your outlet location to continue
                        </p>
                    </div>

                    {/* Outlets grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                        {outlets.map((outlet) => (
                            <button
                                key={outlet.id}
                                onClick={() => handleOutletClick(outlet.id)}
                                className={`
                                    relative p-6 rounded-lg border-2 transition-all duration-200
                                    ${
                                        selectedOutlet === outlet.id
                                            ? "border-gray-800 bg-gray-50 shadow-md"
                                            : "border-gray-200 bg-white hover:border-gray-400"
                                    }
                                    hover:scale-105 hover:shadow-lg
                                    ${
                                        clickAnimation === outlet.id
                                            ? "scale-95"
                                            : ""
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                                `}
                            >
                                {/* Selected outlet */}
                                {selectedOutlet === outlet.id && (
                                    <div className="absolute top-3 right-3">
                                        <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )}

                                {/* Icon container */}
                                <div className="mb-4 flex justify-center">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl grayscale">
                                        {outlet.icon}
                                    </div>
                                </div>

                                {/* Outlet name */}
                                <h3 className="text-lg font-semibold text-gray-900 text-center">
                                    {outlet.name}
                                </h3>
                            </button>
                        ))}
                    </div>

                    {/* Continue button */}
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={handleContinue}
                            disabled={!selectedOutlet}
                            className={`
                                px-8 py-3 rounded-lg font-semibold text-white text-lg
                                transition-all duration-200
                                ${
                                    selectedOutlet
                                        ? "bg-gray-800 hover:bg-gray-900 hover:scale-105 shadow-md hover:shadow-xl"
                                        : "bg-gray-300 cursor-not-allowed"
                                }
                                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                            `}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
