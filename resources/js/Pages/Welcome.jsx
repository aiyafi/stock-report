import { Head, router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion, outlets = [], flash }) {
    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [clickAnimation, setClickAnimation] = useState(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (flash?.error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

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
                    {/* Error Alert */}
                    {showError && flash?.error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="font-medium">{flash.error}</span>
                            </div>
                            <button
                                onClick={() => setShowError(false)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Navigation buttons - top right */}
                    <div className="flex justify-end items-center gap-3 mb-4">
                        {auth.user ? (
                            <>
                                {/* Show user info */}
                                <div className="text-sm text-gray-600">
                                    Hi, <span className="font-semibold">{auth.user.name}</span>
                                    <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                                        {auth.user.role}
                                    </span>
                                </div>
                                
                                {/* Dashboard button for Managers only */}
                                {auth.user.role?.toLowerCase() === 'manager' && (
                                    <Link
                                        href="/dashboard"
                                        className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors group"
                                    >
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                )}
                                
                                {/* Logout button */}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1.5 transition-colors group"
                                >
                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </Link>
                            </>
                        ) : (
                            /* Show Dashboard button for guests */
                            <Link
                                href="/dashboard"
                                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors group"
                            >
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        )}
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
                    <div
                    className="
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8
                        lg:[&>*:last-child:nth-child(3n+1)]:col-start-2
                    "
                    >
                    {outlets.map((outlet) => (
                        <button
                        key={outlet.id}
                        onClick={() => handleOutletClick(outlet.id)}
                        className={`
                            relative p-6 rounded-lg border-2 transition-all duration-200
                            ${selectedOutlet === outlet.id
                            ? "border-gray-800 bg-gray-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-400"}
                            hover:scale-105 hover:shadow-lg
                            ${clickAnimation === outlet.id ? "scale-95" : ""}
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                        `}
                        >
                        {selectedOutlet === outlet.id && (
                            <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            </div>
                        )}

                        <div className="mb-4 flex justify-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl grayscale">
                            {outlet.icon}
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 text-center">{outlet.name}</h3>
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
