import { View, Image } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/tasks' as any);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Image 
        source={require('@/assets/images/tudo-logo.png')} 
        className="w-48 h-48"
        resizeMode="contain"
      />
    </View>
  );
}