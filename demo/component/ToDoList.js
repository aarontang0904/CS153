import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

const Item = ({ item, incrChanges }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>#{item.count}</Text>
    <Text style={styles.itemText}>{item.todo}</Text>
    <Text style={styles.dateText}>{item.date}</Text>
    <Button
      title="Done"
      onPress={() => {
        item["completed"] = true;
        incrChanges();
      }}
    />
    <Text>{item["completed"] ? "done" : "---"}</Text>
  </View>
);

const addTodo = (todos, setTodos, todo, setTodo, counter, setCounter) => {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  const newTodo = { count: counter, todo: todo, date: date, completed: false };
  setTodos([...todos, newTodo]);
  setTodo("");
  setCounter(counter + 1);
};

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [counter, setCounter] = useState(1);
  const [changes, setChanges] = useState(0);

  const incrChanges = () => {
    setChanges(changes + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTodo(text)}
        value={todo}
      />
      <Button
        title="Add ToDo"
        onPress={() =>
          addTodo(todos, setTodos, todo, setTodo, counter, setCounter)
        }
      />
      <FlatList
        data={todos.filter((item) => !item["completed"])}
        extraData={changes}
        renderItem={({ item }) => (
          <Item item={item} incrChanges={incrChanges} />
        )}
        keyExtractor={(item) => item["title"]}
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
  dateText: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
});

export default ToDoList;
