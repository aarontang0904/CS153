import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useValue } from "./ValueContext";

const SettingsScreen = () => {
  const { currentValue, setCurrentValue } = useValue();
  const [localUsername, setLocalUsername] = useState(currentValue.username);
  const [localPassword, setLocalPassword] = useState(currentValue.password);

  const handleSave = () => {
    setCurrentValue({
      ...currentValue,
      username: localUsername,
      password: localPassword,
      loggedin: true,
    });
  };

  const handleLogout = () => {
    setCurrentValue({
      ...currentValue,
      username: "",
      password: "",
      loggedin: false,
    });
    setLocalUsername("");
    setLocalPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {currentValue.loggedin ? (
        <>
          <Text style={{ ...styles.title, color: "#E6ADBC" }}>
            Welcome, {currentValue.username}!
          </Text>
          <Button title="LOGOUT" onPress={handleLogout} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter username"
            value={localUsername}
            onChangeText={setLocalUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter password"
            value={localPassword}
            onChangeText={setLocalPassword}
            style={styles.input}
            secureTextEntry
          />
          <Button title="LOGIN" onPress={handleSave} />
        </>
      )}
      <Text>{"\n"}</Text>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
  },
});

export default SettingsScreen;
