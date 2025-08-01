import React from 'react';
import { View, Text } from 'react-native';

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
    <View 
      style={{ 
        width, 
        height, 
        backgroundColor: '#f3f4f6',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ color: '#6b7280', fontSize: 12 }}>
        Line Chart Stub ({data.length} points)
      </Text>
    </View>
  );
};