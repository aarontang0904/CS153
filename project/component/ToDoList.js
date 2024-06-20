import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useValue } from "./ValueContext";

const Item = ({ item, markAsDone }) => (
  <View style={styles.item}>
    <Text style={[styles.itemText, item.done && styles.doneText]}>
      #{item.count} {item.todo}
    </Text>
    <Text style={styles.dueDateText}>Due: {item.dueDate}</Text>
    <Button
      title={item.done ? "Done" : "Mark as Done"}
      onPress={() => markAsDone(item.count)}
      disabled={item.done}
    />
  </View>
);

// Changed the signature of ToDoList component to remove local state for todos
const ToDoList = () => {
  const { currentValue, todos, setTodos } = useValue();
  const [todo, setTodo] = useState("");
  const [counter, setCounter] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const addTodo = () => {
    const newTodo = {
      count: counter,
      todo: todo,
      done: false,
      dueDate: dueDate,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
    setCounter(counter + 1);
    setDueDate("");
  };

  const markAsDone = (count) => {
    setTodos(
      todos.map((todo) =>
        todo.count === count ? { ...todo, done: true } : todo
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentValue["username"]}'s ToDo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ToDo"
        onChangeText={(text) => setTodo(text)}
        value={todo}
      />
      <TextInput
        style={styles.input}
        placeholder="Due: YYYY-MM-DD"
        onChangeText={(text) => setDueDate(text)}
        value={dueDate}
      />
      <Button title="Add ToDo" onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => <Item item={item} markAsDone={markAsDone} />}
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
    justifyContent: "center",
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
  },
  item: {
    backgroundColor: "#add8e6",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00008b",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
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
});

export default ToDoList;
