import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import regeneratorRuntime from "regenerator-runtime";
import storage from "./Storage";

storage.sync = {
  async todos(params) {
    try {
      console.log("in storage.sync.todos");
    } catch (err) {
      console.log("error in todos.sync", err);
    }
  },
};

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [counter, setCounter] = useState(1);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      storage
        .load({
          key: "todos",
          id: "1",
        })
        .then((ret) => {
          if (ret == undefined) {
            ret = [];
          }
          setTodos(ret);
          setTodo("");
          setCounter(ret.length ? ret[ret.length - 1].count + 1 : 1);
          setDueDate("");
          console.log("just read", JSON.stringify(ret));
        })
        .catch((err) => {
          console.warn(err.message);
          switch (err.name) {
            case "NotFoundError":
              setTodos([]);
              setTodo("");
              setCounter(1);
              setDueDate("");
              console.log("NotFoundError");
              break;
            case "ExpiredError":
              console.log("ExpiredError");
              break;
          }
        });
    } catch (e) {
      console.log("error in getData", e);
    }
  };

  const storeData = async (value) => {
    try {
      await storage.save({
        key: "todos",
        id: "1",
        data: value,
        expires: 1000 * 3600 * 24, // 1 day
      });
      console.log("just stored", JSON.stringify(value));
    } catch (e) {
      console.log("error in storeData", e);
    }
  };

  const clearAll = async () => {
    try {
      await storage.clearMapForKey("todos");
      setTodos([]);
      console.log("Cleared all todos.");
    } catch (e) {
      console.log("error in clearAll", e);
    }
  };

  const addTodo = () => {
    const newTodo = {
      count: counter,
      todo: todo,
      done: false,
      dueDate: dueDate,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    storeData(newTodos);
    setTodo("");
    setCounter(counter + 1);
    setDueDate("");
  };

  const markAsDone = (count) => {
    const updatedTodos = todos.map((todo) =>
      todo.count === count ? { ...todo, done: true } : todo
    );
    setTodos(updatedTodos);
    storeData(updatedTodos);
  };

  const renderTodo = ({ item }) => (
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

  const debug = true;
  const debugView = (
    <View>
      <Text style={styles.headerText}>DEBUGGING INFO</Text>
      <Text>todo is ({todo})</Text>
      <Text>dueDate is ({dueDate})</Text>
      <Text>todos is {JSON.stringify(todos)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
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
      <Button title="Clear All" onPress={clearAll} color="red" />
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.count.toString()}
      />
      {debug && debugView}
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
  headerText: {
    textAlign: "center",
    backgroundColor: "#aaa",
    fontSize: 20,
    padding: 10,
    color: "blue",
  },
});

export default ToDoList;
