import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Demo1 = () => {
  return (
    <View style={{ flex: 1, flexDirection: "col" }}>
      <View style={styles.container}>
        <Text style={styles.box}>A</Text>
        <Text style={styles.box}>B</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.box}>C</Text>
        <Text style={styles.box}>D</Text>
        <Text style={styles.box}>E</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "space-around",
    backgroundColor: "yellow",
  },
  box: {
    flex: 1,
    height: "20%",
    width: 100,
    borderColor: "blue",
    borderWidth: 5, // border width is the thickness of the border
    padding: 20, // padding is the space between the text and the border
    backgroundColor: "#ffccaa",
    margin: 10,
  },
});

export default Demo1;
