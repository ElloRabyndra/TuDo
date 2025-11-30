import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTasks } from "@/hooks/useTasks";
import PriorityBadge from "@/components/PriorityBadge";
import StatusBadge from "@/components/StatusBadge";
import SubTaskItem from "@/components/SubTaskItem";
import { useState } from "react";

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { allTasks, toggleSubTask, deleteTask } = useTasks();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const task = allTasks.find((t) => t.id === id);

  if (!task) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text>Task not found</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
    router.back();
  };

  const isOverdue = task.deadlineDate && task.deadlineTime;
  const deadlineText = isOverdue
    ? `${task.deadlineDate?.split("/")[2] ?? ""}h ${task.deadlineTime?.split(" ")[0] ?? ""}m`
    : null;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-5 pt-8 pb-3 border-b">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Task Details</Text>
          <View className="w-7" />
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Task Header */}
        <View className="mb-4 rounded-xl bg-gray-50">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="flex-1 text-3xl font-bold">{task.title}</Text>
            <TouchableOpacity onPress={() => setShowMenu(true)}>
              <Ionicons name="ellipsis-vertical" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text className="mb-4 text-sm text-gray-400">
            created 2025/03/12 at 05.00 AM
          </Text>

          {/* Badges */}
          <View className="flex-row gap-2 mb-3">
            {task.label && (
              <View className="px-10 py-2 border border-black rounded-r-full bg-lime-300">
                <Text className="text-sm font-medium ">{task.label}</Text>
              </View>
            )}
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </View>

          {/* Deadline */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold">Deadline</Text>
          </View>
          {isOverdue && (
            <View className={`w-32 py-2 px-4 rounded-full border `}>
              <Text
                className={`text-sm text-center font-medium ${
                  task.status === "Done" ? "text-green-700" : "text-red-500"
                }`}
              >
                {task.status === "Done" ? "Completed" : task.deadlineDate}
              </Text>
            </View>
          )}
        </View>

        {/* Subtasks */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold">Subtask</Text>
          </View>

          {task.subTasks.map((subTask) => (
            <SubTaskItem
              key={subTask.id}
              subTask={subTask}
              onToggle={() => toggleSubTask(task.id, subTask.id)}
            />
          ))}
        </View>

        <View className="h-24" />
      </ScrollView>

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
                onPress={handleDelete}
              >
                <Text className="text-base text-center">Delete task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4"
                onPress={() => {
                  setShowMenu(false);
                  router.push(`/edit-task?id=${task.id}` as any);
                }}
              >
                <Text className="text-base text-center">Edit task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View className="items-center justify-center flex-1 px-8 bg-black/30">
          <View className="w-full p-6 bg-white border border-black rounded-xl">
            <Text className="mb-2 text-lg font-semibold text-center">
              Delete Task
            </Text>
            <Text className="mb-6 text-center text-gray-600">
              Are you sure you want to delete "
              <Text className="font-bold">{task.title}</Text>"?
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={confirmDelete}
                className="flex-1 py-3 bg-pink-500 border border-black rounded-2xl"
              >
                <Text className="font-semibold text-center text-white">
                  Yes, Delete Task
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-gray-200 border border-black rounded-2xl"
              >
                <Text className="font-semibold text-center text-gray-800">
                  No, Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
