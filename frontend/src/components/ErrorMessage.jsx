import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry = null,
  showRetry = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-red-500" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                     text-gray-700 text-sm font-medium transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;