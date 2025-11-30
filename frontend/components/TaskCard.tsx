import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Task } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import PriorityBadge from "./PriorityBadge";
import SubTaskItem from "./SubTaskItem";
import { useState } from "react";
import { useRouter } from "expo-router";

interface TaskCardProps {
  task: Task;
  onToggleExpand: () => void;
  onDelete: () => void;
}

export default function TaskCard({
  task,
  onToggleExpand,
  onDelete,
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const isOverdue =
    task.deadlineDate && task.deadlineTime && task.status !== "Done";

  const getColors = () => {
    switch (task.priority) {
      case "High":
        return "bg-lime-200";
      case "Mid":
        return "bg-blue-200";
      case "Low":
        return "bg-sky-300";
    }
  };

  return (
    <View className="mb-3 overflow-hidden bg-white border border-black rounded-xl">
      {/* Header */}
      <View
        className={`flex-row items-center justify-between border-b border-black p-4 ${getColors()}`}
      >
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={onToggleExpand} className="mr-2">
            <Ionicons
              name={task.isExpanded ? "chevron-down" : "chevron-forward"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/task-detail",
                params: { id: task.id },
              } as any)
            }
            className="flex-1"
          >
            <Text className="text-lg font-semibold">{task.title}</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Ionicons name="ellipsis-vertical" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sub Tasks */}
      {task.isExpanded && (
        <View className="p-4 bg-pink-50">
          {task.subTasks.map((subTask) => (
            <SubTaskItem key={subTask.id} subTask={subTask} readonly />
          ))}

          {/* Deadline warning */}
          {isOverdue && (
            <Text className="mt-2 text-xs text-red-500">
              Hi I am subtask 2, my mama is taskparent 1. I'm from italy' is due
              in 2 days
            </Text>
          )}
        </View>
      )}

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/30"
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View className="items-center justify-center flex-1 px-8 border border-black">
            <View className="w-48 overflow-hidden bg-white rounded-xl">
              <TouchableOpacity
                className="p-4 border-b border-gray-200"
                onPress={() => {
                  setShowMenu(false);
                  onDelete();
                }}
              >
                <Text className="text-base text-center">Delete task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4"
                onPress={() => {
                  setShowMenu(false);
                  router.push({
                    pathname: "/edit-task",
                    params: { id: task.id },
                  } as any);
                }}
              >
                <Text className="text-base text-center">Edit task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
