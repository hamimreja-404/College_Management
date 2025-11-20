import React from 'react';

const Header = ({ title, subtitle, userName, userRole }) => {
    const userInitial = userName ? userName.charAt(0) : '?';

    return (
        <header className="flex justify-between items-center pb-6 border-b">
            <div>
                <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
                {subtitle && <p className="text-lg text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center space-x-4">
                <span className="font-semibold text-right">
                    Welcome, {userName || 'User'}!<br />
                    <span className="text-sm text-gray-500 font-normal">{userRole}</span>
                </span>
                <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-bold">
                    {userInitial}
                </div>
            </div>
        </header>
    );
};

export default Header;
