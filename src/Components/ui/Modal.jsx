import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children, maxWidth = 'max-w-md' }) => {
    const modalRef = useRef();

    // Effect to handle closing the modal via Escape key or clicking outside
    useEffect(() => {
        const handleEscape = (event) => event.key === 'Escape' && onClose();
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div ref={modalRef} className={`bg-white rounded-lg shadow-xl w-full ${maxWidth}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
