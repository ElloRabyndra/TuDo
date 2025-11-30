import { View, Text } from "react-native";
import { Status } from "@/constants/types";

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getColors = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 border-yellow-400";
      case "On going":
        return "bg-blue-100 border-blue-400";
      case "Done":
        return "bg-green-100 border-green-400";
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
      className={`px-3 py-1 rounded-full ${getColors()} flex-row items-center`}
    >
      <Text className={`text-xs font-medium ${getTextColor()}`}>{status}</Text>
    </View>
  );
}
