import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";
import EmptyState from "@/components/EmptyState";
import FilterButton from "@/components/FilterButton";
import { useState, useCallback } from "react";
import { Status } from "@/constants/types";

export default function TasksScreen() {
  const router = useRouter();
  const {
    tasks,
    filter,
    setFilter,
    sortByAlphabet,
    setSortByAlphabet,
    toggleExpanded,
    deleteTask,
    loading,
    refresh,
  } = useTasks();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const tasksToDisplay = searchQuery
    ? tasks.filter((task) =>
        task.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

  const handleDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="pt-4 pb-3">
        <View className="flex-row items-center justify-between px-5 mb-4 border-b border-black-200">
          <View className="flex-row items-center">
            <Text className="text-3xl font-bold">To Do</Text>
            <TouchableOpacity className="ml-2">
              <Ionicons name="pencil" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          {/* Search */}
          <View className="flex-row items-center w-32 px-2 mb-4 overflow-hidden font-thin border border-gray-300 rounded-full">
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-base"
            />
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row items-center gap-2 px-5 mb-3">
          <FilterButton
            label="Pending"
            active={filter === "Pending"}
            onPress={() => setFilter("Pending")}
            color="yellow"
          />
          <FilterButton
            label="On going"
            active={filter === "On going"}
            onPress={() => setFilter("On going")}
            color="blue"
          />
          <FilterButton
            label="Done"
            active={filter === "Done"}
            onPress={() => setFilter("Done")}
            color="green"
          />
        </View>

        {/* Sort */}
        <View className="flex-row items-center justify-end px-5">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setSortByAlphabet(!sortByAlphabet)}
          >
            <Text className="mr-1 text-sm font-semibold">Sort A-Z</Text>
            <Ionicons
              name={sortByAlphabet ? "arrow-down" : "arrow-up"}
              size={16}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Task List */}
      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : tasksToDisplay.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {tasksToDisplay.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleExpand={() => toggleExpanded(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
          <View className="h-24" />
        </ScrollView>
      )}
      {/* Add Button */}
      <View className="absolute left-0 right-0 items-center bottom-8">
        {/* Tambahkan View ini sebagai wadah untuk border */}
        <View className="flex-row items-center justify-center w-full border-t border-black bg-gray-50">
          <TouchableOpacity
            onPress={() => router.push("/add-task" as any)}
            className="items-center justify-center w-16 h-16 rounded-full shadow-lg"
          >
            <Image
              source={require("@/assets/images/button-add.png")}
              className="w-16 h-16 -mt-8"
            />
          </TouchableOpacity>
        </View>
        {/* Akhir View border */}
      </View>
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
              Are you sure you want to delete this task?
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
