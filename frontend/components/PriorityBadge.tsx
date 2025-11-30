import { View, Text } from "react-native";
import { Priority } from "@/constants/types";
import Feather from "@expo/vector-icons/Feather";
interface PriorityBadgeProps {
  priority: Priority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getColors = () => {
    switch (priority) {
      case "High":
        return "bg-red-500 border-red-700";
      case "Mid":
        return "bg-orange-400 border-orange-500";
      case "Low":
        return "bg-green-500 border-green-700";
    }
  };

  return (
    <View
      className={`px-3 py-1 flex  gap-1 items-center border rounded-xl ${getColors()} flex-row items-center`}
    >
      <Feather name="alert-triangle" size={12} color="white" />
      <Text className="text-sm font-medium text-white">{priority}</Text>
    </View>
  );
}
