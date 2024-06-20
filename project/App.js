import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "./component/HomeScreen";
import SettingsScreen from "./component/SettingsScreen";
import AboutScreen from "./component/AboutScreen";
import ToDoList from "./component/ToDoList";
import CalendarScreen from "./component/CalendarScreen";
import ValueProvider from "./component/ValueContext";

const Tab = createBottomTabNavigator();

const App = () => {
  let data = { username: "", password: "", loggedin: false };

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "ToDo") {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === "About") {
                iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              } else if (route.name === "Calendar") {
                iconName = focused ? "calendar" : "calendar-outline";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "blue",
            inactiveTintColor: "gray",
          }}
        >
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
            name="Calendar"
            component={CalendarScreen}
            options={{ headerTitle: "Calendar" }}
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
