import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TextBox = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.box}>{info}</Text>
      <Text style={{ ...styles.box, flex: 2 }}>footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "col",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "space-around",
    backgroundColor: "yellow",
  },
  box: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 5, // border width is the thickness of the border
    padding: 20, // padding is the space between the text and the border
    backgroundColor: "#ffccaa",
    margin: 10,
  },
});

export default TextBox;
