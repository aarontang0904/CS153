import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useValue } from "./ValueContext";
import { Agenda } from "react-native-calendars";

const CalendarScreen = () => {
  const { todos } = useValue();
  const [items, setItems] = useState({});
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const formattedTodos = todos.reduce((acc, todo) => {
      if (todo.dueDate) {
        if (!acc[todo.dueDate]) {
          acc[todo.dueDate] = [];
        }
        acc[todo.dueDate].push({
          name: todo.todo,
          done: todo.done,
          count: todo.count,
          height: 50,
        });
      }
      return acc;
    }, {});
    console.log("Formatted Todos: ", formattedTodos); // Add this line
    setItems(formattedTodos);
  }, [todos]);

  const renderItem = (item) => (
    <View style={styles.todoItem}>
      <Text style={[styles.itemText, item.done && styles.doneText]}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={selectedDay}
        renderItem={renderItem}
        onDayPress={(day) => {
          console.log("Day pressed: ", day.dateString); // Add this line
          setSelectedDay(day.dateString);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  todoItem: {
    backgroundColor: "#add8e6",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default CalendarScreen;
