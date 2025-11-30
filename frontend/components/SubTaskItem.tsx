import { View, Text, TouchableOpacity } from "react-native";
import { SubTask } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";

interface SubTaskItemProps {
  subTask: SubTask;
  onToggle?: () => void;
  readonly?: boolean;
}

export default function SubTaskItem({
  subTask,
  onToggle,
  readonly = false,
}: SubTaskItemProps) {
  return (
    <View
      className={`${readonly ? "" : "mb-6 border-b border-l border-r rounded-2xl bg-lime-300 black"}`}
    >
      <View
        className={`${readonly ? "p-1" : "p-3"}  rounded-2xl mb-2 border transform ${
          subTask.completed ? "bg-gray-100" : "bg-white border-black"
        }`}
      >
        <View className="flex-row items-center">
          {!readonly && (
            <TouchableOpacity onPress={onToggle} className="mr-3">
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  subTask.completed ? "bg-green-500 border-green-500" : ""
                }`}
              >
                {subTask.completed && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
            </TouchableOpacity>
          )}
          <Text
            className={`flex-1 p-2 ${subTask.completed ? "text-gray-400 line-through" : "text-gray-800"}`}
          >
            {subTask.title}
          </Text>
        </View>
      </View>
    </View>
  );
}
