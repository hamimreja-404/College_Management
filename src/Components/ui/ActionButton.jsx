import React from 'react';
import Spinner from './Spinner.jsx';

export default function ActionButton({
  isLoading = false,
  type = 'button',
  fullWidth = false,
  children,
  onClick,
  ...props // Pass any other props like className
}) {
  const baseClasses = "flex justify-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  const colorClasses = "bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed focus:ring-teal-500";
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${widthClass} ${props.className || ''}`}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

