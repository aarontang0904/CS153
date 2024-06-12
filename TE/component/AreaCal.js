import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";

const AreaCal = () => {
  const [area, setArea] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, fontSize: 25, fontWeight: "bold" }}>
        Calculate area of triangle by Herron's rule
      </Text>
      <Text style={styles.text}>
        Write the code for this app which calculates
      </Text>
      <Text style={styles.text}>area = Math.sqrt(s*(s-a)*(s-b)*(s-c))</Text>
      <Text style={styles.text}>where s = (a+b+c)/2</Text>
      <TextInput
        style={styles.box}
        onChangeText={(newText) => setA(newText)}
        defaultValue={text}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.box}
        onChangeText={(newText) => setB(newText)}
        defaultValue={text}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.box}
        onChangeText={(newText) => setC(newText)}
        defaultValue={text}
        keyboardType="numeric"
      />
      <Button
        title="CALCULATE AREA"
        onPress={() => {
          const sideA = parseFloat(a);
          const sideB = parseFloat(b);
          const sideC = parseFloat(c);
          const s = (sideA + sideB + sideC) / 2;
          setArea(Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC)));
        }}
      />
      <Text style={styles.text}>area is {area}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
    borderColor: "blue",
    alignItems: "center", // center the text vertically
    justifyContent: "center", // center the text horizontally
    backgroundColor: "white",
    margin: 30,
  },
  text: {
    fontSize: 20,
  },
  box: {
    height: 40,
    width: 250,
    backgroundColor: "yellow",
  },
});

export default AreaCal;
