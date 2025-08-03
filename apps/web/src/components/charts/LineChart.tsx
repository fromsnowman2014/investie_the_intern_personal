import React from 'react';

interface LineChartProps {
  data?: number[];
  width?: number;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data = [], 
  width = 200, 
  height = 32 
}) => {
  return (
    <div 
      className="bg-gray-100 rounded flex items-center justify-center"
      style={{ width, height }}
    >
      <span className="text-gray-500 text-sm">
        Line Chart Stub ({data.length} points)
      </span>
    </div>
  );
};