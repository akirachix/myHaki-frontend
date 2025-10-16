import React from 'react';

interface LoadingSpinnerProps {
  size?: string;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'h-16 w-16', 
  text = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full ${size} border-b-4 border-[#621616]`}></div>
      {text && <p className="text-gray-600 text-lg mt-4">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;