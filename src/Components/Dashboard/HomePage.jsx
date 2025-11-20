import React, { useState } from 'react';

// You can replace this with your actual logo if you have one
const Logo = () => (
    <div className="flex items-center space-x-2">
        <svg className="w-8 h-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253m18.132-4.496A9 9 0 0012 6c-3.771 0-7.036 2.273-8.418 5.42" />
        </svg>
        <span className="text-2xl font-bold text-gray-800">Globe Allied</span>
    </div>
);

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // CSS for the animated gradient background
    const animatedBgStyle = `
        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;

    return (
        <div className="bg-white font-sans">
            <style>{animatedBgStyle}</style>
            {/* Header */}
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <Logo />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            About Us
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-white bg-teal-600 px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-md">
                            Login <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 z-50" />
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5"><Logo /></a>
                                <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    {/* Links removed as requested */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main>
                {/* Hero Section */}
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                         <div 
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a7f3d0] via-[#5eead4] to-[#0d9488] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{ 
                                backgroundSize: '200% 200%',
                                animation: 'gradient-animation 15s ease infinite',
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' 
                            }}>
                        </div>
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Globe Allied Healthcare Skill Council
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Empowering the next generation of healthcare professionals with certified skills and real-world training. Access your student portal to track your progress.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a href="#" className="rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                                    Go to Login
                                </a>
                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-gray-50 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-teal-600">Your Future in Healthcare</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to succeed</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Our platform provides a centralized hub for students and administrators to manage academic progress and institutional data seamlessly.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                <div className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">Student Portal Access</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">View your profile, track grades, and stay updated with your academic journey all in one place.</dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">Admin Management</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">A powerful dashboard for college admins to manage student records, status, and information efficiently.</dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">Centralized Oversight</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">Super admins have a complete overview of all institutions, ensuring data integrity and system management.</dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">Secure & Reliable</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">Built on a modern technology stack to ensure your data is safe, secure, and always accessible.</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white">
                <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
                    <p className="text-center text-xs leading-5 text-gray-500">
                        &copy; 2025 Globe Allied Healthcare Skill Council. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

