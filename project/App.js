import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "./component/HomeScreen";
import ToDoList from "./component/ToDoList";
import CalendarScreen from "./component/CalendarScreen";
import Timer from "./component/Timer";
import SettingsScreen from "./component/SettingsScreen";
import { ValueProvider } from "./component/ValueContext";

const Tab = createBottomTabNavigator();

const App = () => {
  const data = { username: "", password: "", loggedin: false };

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
              } else if (route.name === "Timer") {
                iconName = focused ? "time" : "time-outline";
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
            name="Timer"
            component={Timer}
            options={{ headerTitle: "Pomodoro Timer" }}
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
