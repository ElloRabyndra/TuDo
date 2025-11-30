import { View, Text, TouchableOpacity } from 'react-native';
import { SubTask } from '@/constants/types';
import { Ionicons } from '@expo/vector-icons';

interface SubTaskItemProps {
  subTask: SubTask;
  onToggle?: () => void;
  readonly?: boolean;
}

export default function SubTaskItem({ subTask, onToggle, readonly = false }: SubTaskItemProps) {
  return (
    <View className={`p-3 rounded-lg mb-2 border ${
      subTask.completed ? 'bg-gray-100 border-gray-300' : 'bg-white border-black'
    }`}>
      <View className="flex-row items-center">
        {!readonly && (
          <TouchableOpacity onPress={onToggle} className="mr-3">
            <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              subTask.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}>
              {subTask.completed && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
          </TouchableOpacity>
        )}
        <Text className={`flex-1 ${subTask.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {subTask.title}
        </Text>
      </View>
    </View>
  );
}