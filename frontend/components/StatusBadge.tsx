import { View, Text } from "react-native";
import { Status } from "@/constants/types";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getColors = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400";
      case "On going":
        return "bg-blue-400";
      case "Done":
        return "bg-green-400";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "Pending":
        return "text-yellow";
      case "On going":
        return "text-blue";
      case "Done":
        return "text-green";
    }
  };

  return (
    <View
      className={`px-5 py-2 rounded-full border flex-row items-center gap-1`}
    >
      <View className={`w-3 h-3 rounded-full ${getColors()}`} />
      <Text className={`text-sm ${getTextColor()} font-medium`}>{status}</Text>
    </View>
  );
}
