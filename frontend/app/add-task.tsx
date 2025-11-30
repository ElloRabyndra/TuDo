import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Priority } from "@/constants/types";

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("High");
  const [label, setLabel] = useState("");
  const [subTasks, setSubTasks] = useState<string[]>(["", "", ""]);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, ""]);
  };

  const updateSubTask = (index: number, value: string) => {
    const updated = [...subTasks];
    updated[index] = value;
    setSubTasks(updated);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a task name");
      return;
    }

    addTask({
      title,
      priority,
      label,
      subTasks: subTasks.filter((st) => st.trim() !== ""),
      deadlineDate: deadlineDate || undefined,
      deadlineTime: deadlineTime || undefined,
    });

    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
        <View className="flex-row items-center">
          <Text className="text-3xl font-bold">To Do</Text>
          <TouchableOpacity className="ml-2">
            <Ionicons name="pencil" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View className="px-4 py-2 bg-white rounded-full">
          <Ionicons name="search" size={20} color="#999" />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text className="mb-6 text-2xl font-bold">Add New Task</Text>

        {/* Parent Task Name */}
        <TextInput
          placeholder="Parent task name"
          value={title}
          onChangeText={setTitle}
          className="px-4 py-3 mb-4 text-base bg-white rounded-lg"
        />

        {/* Priority Dropdown */}
        <View className="flex-row items-center justify-between px-4 py-3 mb-4 bg-white rounded-lg">
          <Text className={title ? "text-gray-800" : "text-gray-400"}>
            {priority || "Priority"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#999" />
        </View>

        {/* Priority Options */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setPriority("High")}
            className={`px-4 py-2 rounded-full ${priority === "High" ? "bg-pink-500" : "bg-gray-200"}`}
          >
            <Text
              className={priority === "High" ? "text-white" : "text-gray-800"}
            >
              High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("Mid")}
            className={`px-4 py-2 rounded-full ${priority === "Mid" ? "bg-orange-400" : "bg-gray-200"}`}
          >
            <Text
              className={priority === "Mid" ? "text-white" : "text-gray-800"}
            >
              Mid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("Low")}
            className={`px-4 py-2 rounded-full ${priority === "Low" ? "bg-green-500" : "bg-gray-200"}`}
          >
            <Text
              className={priority === "Low" ? "text-white" : "text-gray-800"}
            >
              Low
            </Text>
          </TouchableOpacity>
        </View>

        {/* Label */}
        <TextInput
          placeholder="Label"
          value={label}
          onChangeText={setLabel}
          className="px-4 py-3 mb-4 text-base bg-white rounded-lg"
        />

        {/* Sub Task Section */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-semibold">Sub Task</Text>
          <TouchableOpacity
            onPress={handleAddSubTask}
            className="flex-row items-center px-4 py-2 bg-pink-500 rounded-full"
          >
            <Text className="mr-1 font-medium text-white">Add Sub Task</Text>
          </TouchableOpacity>
        </View>

        {subTasks.map((subTask, index) => (
          <TextInput
            key={index}
            placeholder="Parent task name"
            value={subTask}
            onChangeText={(text) => updateSubTask(index, text)}
            className="px-4 py-3 mb-3 text-base bg-white rounded-lg"
          />
        ))}

        {/* Deadline Date */}
        <Text className="mb-3 text-lg font-semibold">Deadline Date</Text>
        <View className="flex-row gap-3 mb-6">
          <TextInput
            placeholder="Date"
            value={deadlineDate}
            onChangeText={setDeadlineDate}
            className="flex-1 px-4 py-3 text-base bg-white rounded-lg"
          />
          <TextInput
            placeholder="Time"
            value={deadlineTime}
            onChangeText={setDeadlineTime}
            className="flex-1 px-4 py-3 text-base bg-white rounded-lg"
          />
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* Save Button */}
      <View className="px-5 pb-6">
        <TouchableOpacity
          onPress={handleSave}
          className="flex-row items-center justify-center py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <Ionicons name="arrow-down" size={20} color="white" />
          <Text className="ml-2 text-lg font-semibold text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
