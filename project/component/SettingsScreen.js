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
