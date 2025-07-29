import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
  const baseClasses = 'bg-white rounded-xl p-4 shadow-sm mb-4';
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;
  
  return (
    <View className={combinedClasses} {...props}>
      {children}
    </View>
  );
}