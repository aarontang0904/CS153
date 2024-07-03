import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useValue } from "./ValueContext";
import { format } from "date-fns";
import Button from "./Button";

const HomeScreen = ({ navigation }) => {
  const { currentValue, todos } = useValue();
  const [todosDueToday, setTodosDueToday] = useState([]);

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    const dueToday = todos.filter((todo) => todo.dueDate === today);
    setTodosDueToday(dueToday);
  }, [todos]);

  const renderTodo = ({ item }) => (
    <View style={[styles.todoItem, item.done && styles.todoItemDone]}>
      <Text style={styles.todoText}>{item.todo}</Text>
      <Text style={styles.dueDateText}>Due: {item.dueDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Time {currentValue.username}!</Text>
      <Button
        label="Check my to-do list"
        theme="primary"
        onPress={() => navigation.navigate("ToDo")}
      />
      <Button
        label="Check my calendar"
        onPress={() => navigation.navigate("Calendar")}
      />
      <Text style={styles.subtitle}>To-Dos Due Today:</Text>
      {todosDueToday.length > 0 ? (
        <FlatList
          data={todosDueToday}
          renderItem={renderTodo}
          keyExtractor={(item) => item.count.toString()}
        />
      ) : (
        <Text style={styles.noTodosText}>No to-dos due today!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Arial",
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 15,
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
    justifyContent: "space-between",
  },
  todoItemDone: {
    backgroundColor: "#d3ffd3",
  },
  todoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  dueDateText: {
    fontSize: 14,
    color: "#ff0000",
  },
  noTodosText: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
  },
});

export default HomeScreen;
