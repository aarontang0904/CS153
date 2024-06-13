import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useValue } from "./ValueContext";

const HomeScreen = ({ navigation }) => {
  const { currentValue } = useValue();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Time, {currentValue["username"]}!
      </Text>
      <Button
        title="Check my to-do list"
        onPress={() => navigation.navigate("ToDo")}
      />
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
});

export default HomeScreen;
