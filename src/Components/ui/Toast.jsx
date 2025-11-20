import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
    // Automatically close the toast after 3 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    );

    return (
        <div className="fixed top-5 right-5 z-[100]">
            <div className={`flex items-center text-white p-4 rounded-lg shadow-lg ${bgColor} animate-slide-in-right`}>
                {icon}
                <span className="ml-3 font-medium">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
