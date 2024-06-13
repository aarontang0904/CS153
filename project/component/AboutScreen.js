import React from "react";
import { Text, View, StyleSheet, Flatlist } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        This app is designed to help you manage your time efficiently. It offers
        a variety of features including task management, calendar integration,
        time tracking, and more. Whether you are a student, a professional, or
        anyone looking to improve their productivity, this app provides the
        tools you need to stay organized and focused.
      </Text>
      <Text style={styles.subtitle}>Key Features:</Text>
      <Text style={styles.text}>- Create and manage tasks</Text>
      <Text style={styles.text}>- Set due dates and reminders</Text>
      <Text style={styles.text}>- Track your time with a built-in timer</Text>
      <Text style={styles.text}>- View your tasks in a calendar format</Text>
      <Text style={styles.text}>- Sync with external calendars</Text>
      <Text style={styles.text}>
        - Collaborate with others by sharing tasks and projects
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Verdana",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "flex-start",
    lineHeight: 24,
    fontFamily: "Times New Roman",
  },
});

export default AboutScreen;
