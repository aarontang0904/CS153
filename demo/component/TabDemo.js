import React from "react";
// import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
import ValueProvider from "./ValueContext";

const Tab = createBottomTabNavigator();

const App = () => {
  let data = { username: "None", status: "admin" };

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
};

export default App;
