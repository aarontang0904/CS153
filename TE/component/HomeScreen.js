import React from "react";
import { Text, View } from "react-native";
import { useValue } from "./ValueContext";

const HomeScreen = () => {
  const { currentValue } = useValue();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Text>Username: {currentValue["username"]}</Text>
      <Text>Password: {currentValue["password"]}</Text> {/* Add password */}
      <Text>Status: {currentValue["status"]}</Text>
    </View>
  );
};

export default HomeScreen;
