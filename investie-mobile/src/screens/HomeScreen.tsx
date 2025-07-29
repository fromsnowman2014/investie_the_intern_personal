import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Market Summary</Text>
        {/* Market summary cards will go here */}
        
        <Text className="text-xl font-semibold text-gray-900 mb-4 mt-6">Stock Cards</Text>
        {/* Stock cards will go here */}
      </View>
    </ScrollView>
  );
}