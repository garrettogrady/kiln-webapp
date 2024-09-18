// components/ProgressIndicator.tsx
import React from 'react';

interface ProgressIndicatorProps {
  totalSteps: number;
  activeStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalSteps, activeStep }) => {
  return (
    <div className="flex mt-6 space-x-2">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index + 1 === activeStep ? 'bg-[#254442]' : 'bg-[#D1D5DB]'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressIndicator;