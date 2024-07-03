import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { useValue } from "./ValueContext";
import SmallButton from "./SmallButton";

const ToDoList = () => {
  const { todos, setTodos } = useValue();
  const [todo, setTodo] = useState("");
  const [counter, setCounter] = useState(
    todos?.length ? todos[todos.length - 1].count + 1 : 1
  );
  const [dueDate, setDueDate] = useState("");

  const addTodo = () => {
    const newTodo = { count: counter, todo, done: false, dueDate };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo("");
    setCounter(counter + 1);
    setDueDate("");
  };

  const clearAll = () => {
    setTodos([]);
  };

  const markAsDone = (count) => {
    const updatedTodos = todos.map((todo) =>
      todo.count === count ? { ...todo, done: true } : todo
    );
    setTodos(updatedTodos);
  };

  const renderTodo = ({ item }) => (
    <View style={[styles.item, item.done && styles.itemDone]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.itemText, item.done && styles.doneText]}>
          {item.todo}
        </Text>
        <Text style={styles.dueDateText}>Due: {item.dueDate}</Text>
      </View>
      <SmallButton
        label={item.done ? "Done" : "Mark as Done"}
        onPress={() => markAsDone(item.count)}
        color={item.done ? "gray" : "#007BFF"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ToDo"
        onChangeText={setTodo}
        value={todo}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Due: YYYY-MM-DD"
        onChangeText={setDueDate}
        value={dueDate}
        placeholderTextColor="#999"
      />
      <View style={styles.buttonRow}>
        <SmallButton label="Add ToDo" onPress={addTodo} color="#28a745" />
        <SmallButton label="Clear All" onPress={clearAll} color="red" />
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.count.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "80%",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDone: {
    backgroundColor: "#d3ffd3",
  },
  itemHeader: {
    // flex: 1,
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  dueDateText: {
    fontSize: 14,
    color: "#ff0000",
    marginTop: 5,
  },
  smallButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  smallButton: {
    width: "45%",
  },
});

export default ToDoList;
