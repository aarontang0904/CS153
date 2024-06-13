import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useValue } from "./ValueContext";

const SettingsScreen = () => {
  const { currentValue, setCurrentValue } = useValue();
  const [localUsername, setLocalUsername] = useState(currentValue.username);

  const handleSave = () => {
    setCurrentValue({ ...currentValue, username: localUsername });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TextInput
        placeholder="Enter username"
        value={localUsername}
        onChangeText={(text) => setLocalUsername(text)}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
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
    width: "30%",
  },
});

export default SettingsScreen;
