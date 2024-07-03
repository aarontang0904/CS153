import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import SmallButton from "./SmallButton";
import { useValue } from "./ValueContext";
import RNPickerSelect from "react-native-picker-select";

const Timer = () => {
  const { todos } = useValue();
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(1800); // Default to 30 minutes
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [customMinutes, setCustomMinutes] = useState("");

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const resetTimer = () => {
    setSeconds(1800);
    setIsActive(false);
  };

  const handleTodoSelect = (value) => {
    setSelectedTodo(value);
  };

  const setTimer = (minutes) => {
    setSeconds(minutes * 60);
    setIsActive(false);
  };

  const handleCustomSet = () => {
    const minutes = parseInt(customMinutes);
    if (!isNaN(minutes) && minutes > 0) {
      setTimer(minutes);
      setCustomMinutes("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => handleTodoSelect(value)}
          items={todos.map((todo) => ({
            label: `${todo.todo} (Due: ${todo.dueDate})`,
            value: todo,
          }))}
          placeholder={{
            label: "Select a To-Do...",
            value: null,
          }}
        />
      </View>
      {selectedTodo && (
        <Text style={styles.selectedTodoText}>
          Selected To-Do: {selectedTodo.todo}
        </Text>
      )}
      <View style={styles.buttonRow}>
        <SmallButton label="5 mins" onPress={() => setTimer(5)} />
        <SmallButton label="15 mins" onPress={() => setTimer(15)} />
        <SmallButton label="60 mins" onPress={() => setTimer(60)} />
      </View>
      <View style={styles.customSetRow}>
        <TextInput
          style={styles.customInput}
          placeholder="Enter minutes"
          onChangeText={setCustomMinutes}
          value={customMinutes}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        <Button title="Set" onPress={handleCustomSet} />
      </View>
      <View style={styles.buttonRow}>
        <SmallButton
          label={isActive ? "Pause" : "Start"}
          onPress={() => setIsActive(!isActive)}
        />
        <SmallButton label="Reset" onPress={resetTimer} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Arial",
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Arial",
  },
  pickerContainer: {
    width: "80%",
    marginVertical: 20,
  },
  selectedTodoText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  customSetRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  customInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    flex: 1,
    color: "#333",
  },
});

export default Timer;
