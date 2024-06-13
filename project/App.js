import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./component/HomeScreen";
import SettingsScreen from "./component/SettingsScreen";
import AboutScreen from "./component/AboutScreen";
import ToDoList from "./component/ToDoList";
import ValueProvider from "./component/ValueContext";

const Tab = createBottomTabNavigator();

const App = () => {
  let data = { username: "", status: "admin" };

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: "Home" }}
          />
          <Tab.Screen
            name="ToDo"
            component={ToDoList}
            options={{ headerTitle: "To-Do List" }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{ headerTitle: "About" }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerTitle: "Settings" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
};

export default App;
