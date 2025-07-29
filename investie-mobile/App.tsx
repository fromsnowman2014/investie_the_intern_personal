import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-lg font-semibold text-gray-900 mb-4">Investie - Market Summary App</Text>
      <Text className="text-positive">✅ React Native + Expo initialized</Text>
      <Text className="text-positive">✅ TypeScript configured</Text>
      <Text className="text-positive">✅ NativeWind (Tailwind CSS) configured</Text>
      <StatusBar style="auto" />
    </View>
  );
}
