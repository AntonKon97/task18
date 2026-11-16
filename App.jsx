import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [pickerDate, setPickerDate] = useState(new Date());

  const handleAddTask = () => {
    const title = taskTitle.trim();

    if (!title) return;

    const newTask = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      dueDate: null,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle("");
  };

  const handleEditTask = (task) => {
    setTaskTitle(task.title);
    setEditingTaskId(task.id);
  };

  const handleSaveTask = () => {
    const title = taskTitle.trim();

    if (!title) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTaskId ? { ...task, title } : task,
      ),
    );

    setTaskTitle("");
    setEditingTaskId(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleOpenDatePicker = (task) => {
    setPickerDate(task.dueDate || new Date());
    setSelectedTaskId(task.id);
  };

  const handleConfirmDate = (date) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTaskId ? { ...task, dueDate: date } : task,
      ),
    );

    setSelectedTaskId(null);
  };

  const handleCancelDatePicker = () => {
    setSelectedTaskId(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={styles.taskTitle}>{task.title}</Text>

            <TouchableOpacity onPress={() => handleOpenDatePicker(task)}>
              <Text style={styles.dueDate}>
                {task.dueDate ? task.dueDate.toLocaleString() : "No Due Date"}
              </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditTask(task)}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <TouchableOpacity
          onPress={editingTaskId ? handleSaveTask : handleAddTask}
        >
          <Text style={styles.buttonText}>
            {editingTaskId ? "Save" : "Add Task"}
          </Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        testID="date-picker"
        modal
        open={selectedTaskId !== null}
        date={pickerDate}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={handleCancelDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  dueDate: {
    color: "gray",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  actionText: {
    color: "blue",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 8,
  },
  buttonText: {
    color: "blue",
  },
});

export default App;
