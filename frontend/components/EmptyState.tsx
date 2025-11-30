import { View, Text, Image } from "react-native";

export default function EmptyState() {
  return (
    <View className="items-center justify-center flex-1 px-8 -mt-20">
      <Image
        source={require("@/assets/images/empty-task.png")}
        className="w-48 h-48 mb-4 "
        resizeMode="contain"
      />
      <Text className="text-sm text-center text-gray-400">
        You haven't add any tasks yet
      </Text>
      <Text className="text-sm text-center text-gray-400">
        Click + to add task
      </Text>
    </View>
  );
}
