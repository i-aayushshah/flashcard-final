import React from 'react';

const Input = ({ label, id, className = '', ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
