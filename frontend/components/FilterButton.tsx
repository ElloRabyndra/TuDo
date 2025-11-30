import { TouchableOpacity, Text, View } from "react-native";

interface FilterButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
  color?: string;
}

export default function FilterButton({
  label,
  active,
  onPress,
  color = "yellow",
}: FilterButtonProps) {
  const getColors = () => {
    if (!active) return "border-gray-300";
  };

  const getDotColor = () => {
    switch (color) {
      case "yellow":
        return "bg-yellow-400";
      case "blue":
        return "bg-blue-400";
      case "green":
        return "bg-green-400";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full border flex-row items-center gap-1 ${getColors()}`}
    >
      <View className={`w-3 h-3 rounded-full ${getDotColor()}`} />
      <Text className={`text-sm   ${active ? "text-black" : "text-gray-400"} `}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
