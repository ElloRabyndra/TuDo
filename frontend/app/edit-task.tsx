import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Priority, SubTask } from "@/constants/types";
import { formatDate, formatTime } from "@/lib/utils";
import api from "@/services/api";

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { allTasks } = useTasks();

  const task = allTasks.find((t) => t.id === id);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("High");
  const [label, setLabel] = useState("");

  // Ubah state subtasks untuk menyimpan objek lengkap dengan ID
  const [subTasks, setSubTasks] = useState<
    Array<{ id?: string; title: string; isNew?: boolean }>
  >([]);

  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);
  const [deadlineTime, setDeadlineTime] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setLabel(task.label);

      // Simpan subtask dengan ID-nya
      setSubTasks(
        task.subTasks.map((st) => ({
          id: st.id,
          title: st.title,
          isNew: false,
        }))
      );

      // parsing deadline date
      if (task.deadlineDate) {
        const date = new Date(task.deadlineDate);
        if (!isNaN(date.getTime())) {
          setDeadlineDate(date);
        }
      }

      // parsing deadline time
      if (task.deadlineTime) {
        const time = new Date(task.deadlineTime);
        if (!isNaN(time.getTime())) {
          setDeadlineTime(time);
        }
      }
    }
  }, [task]);

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, { title: "", isNew: true }]);
  };

  const updateSubTask = (index: number, value: string) => {
    const updated = [...subTasks];
    updated[index].title = value;
    setSubTasks(updated);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDeadlineDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setDeadlineTime(selectedTime);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a task name");
      return;
    }

    try {
      // 1. Update parent task
      const formattedDeadlineDate = deadlineDate
        ? deadlineDate.toISOString()
        : undefined;
      const formattedDeadlineTime = deadlineTime
        ? deadlineTime.toISOString()
        : undefined;

      await api.put(`/parenttasks/${id}`, {
        title,
        priority,
        label,
        deadlineDate: formattedDeadlineDate,
        deadlineTime: formattedDeadlineTime,
      });

      // 2. Proses subtasks yang ada (update jika ada perubahan)
      for (const st of subTasks) {
        if (st.title.trim() === "") continue; // Skip subtask kosong

        if (st.isNew) {
          // Buat subtask baru
          await api.post("/subtasks", {
            parentId: id,
            title: st.title,
            completed: false,
          });
        } else if (st.id) {
          // Update subtask yang sudah ada (jika diperlukan)
          await api.put(`/subtasks/${st.id}`, {
            title: st.title,
          });
        }
      }

      router.back();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task");
    }
  };

  if (!task) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <Text>Task not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 pt-6" showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <View className="flex-row items-center p-8 pl-0">
            <TouchableOpacity onPress={() => router.back()} className="">
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text className="ml-32 text-2xl font-bold">Edit Task</Text>
          </View>

          {/* Task Name */}
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="px-4 py-3 mb-4 text-base border-2 border-gray-300 rounded-lg focus:border-black"
          />

          {/* Priority Dropdown */}
          <View className="flex-row items-center justify-between px-4 py-3 mb-4 border border-gray-300 rounded-lg">
            <Text className="text-gray-800">{priority}</Text>
          </View>

          {/* Priority Options */}
          <View className="flex-row gap-2 mb-4">
            <TouchableOpacity
              onPress={() => setPriority("High")}
              className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${priority === "High" ? "border bg-red-500 border-red-700" : "border border-gray-400"}`}
            >
              <Feather
                name="alert-triangle"
                size={12}
                color={priority === "High" ? "white" : "gray"}
              />
              <Text
                className={priority === "High" ? "text-white" : "text-gray-800"}
              >
                High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPriority("Mid")}
              className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${priority === "Mid" ? "border bg-orange-400 border-orange-500" : "border border-gray-400"}`}
            >
              <Feather
                name="alert-triangle"
                size={12}
                color={priority === "Mid" ? "white" : "gray"}
              />
              <Text
                className={priority === "Mid" ? "text-white" : "text-gray-800"}
              >
                Mid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPriority("Low")}
              className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${priority === "Low" ? "border bg-green-500 border-green-700" : "border border-gray-400"}`}
            >
              <Feather
                name="alert-triangle"
                size={12}
                color={priority === "Low" ? "white" : "gray"}
              />
              <Text
                className={priority === "Low" ? "text-white" : "text-gray-800"}
              >
                Low
              </Text>
            </TouchableOpacity>
          </View>

          {/* Label */}
          <TextInput
            value={label}
            onChangeText={setLabel}
            className="px-4 py-3 mb-4 text-base border-2 border-gray-300 rounded-lg focus:border-black"
          />

          {/* Sub Task Section */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold">Sub Task</Text>
            <TouchableOpacity
              onPress={handleAddSubTask}
              className="relative flex-row items-center h-10"
            >
              <View
                className="flex-row items-center justify-center h-10 pl-12 pr-4 bg-white border border-black"
                style={{
                  borderRadius: 9999,
                }}
              >
                <Text className="font-medium text-black">Add Sub Task</Text>
              </View>

              <View className="absolute top-0 left-0 flex-row items-center justify-center w-10 h-10 bg-pink-500 border border-black rounded-full">
                <Text className="text-xl font-medium text-white -mt-0.5">
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {subTasks.map((subTask, index) => (
            <TextInput
              key={index}
              value={subTask.title}
              onChangeText={(text) => updateSubTask(index, text)}
              placeholder="Subtask name"
              className="px-4 py-3 mb-3 text-base border-2 border-gray-300 rounded-lg focus:border-black"
            />
          ))}

          {/* Deadline Date */}
          <Text className="mb-3 text-lg font-semibold">Deadline Date</Text>
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg"
            >
              <Text
                className={deadlineDate ? "text-gray-800" : "text-gray-400"}
              >
                {deadlineDate ? formatDate(deadlineDate) : "Date"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg"
            >
              <Text
                className={deadlineTime ? "text-gray-800" : "text-gray-400"}
              >
                {deadlineTime ? formatTime(deadlineTime) : "Time"}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={deadlineDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={deadlineTime || new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onTimeChange}
              is24Hour={true}
            />
          )}
        </View>

        {/* Save Button */}
        <View className="px-5 pt-8 pb-6 mt-12 mb-12 border-t">
          <TouchableOpacity
            onPress={handleSave}
            className="flex-row items-center justify-center rounded-full"
            style={{
              height: 50,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 8,
            }}
          >
            <Image
              source={require("@/assets/images/save-button.png")}
              className="w-full h-full"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
