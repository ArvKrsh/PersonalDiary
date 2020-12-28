import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import HomeScreen from "./src/components/Home";
import NewEntryScreen from "./src/components/NewEntry";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "Diary",
            headerStyle: {
              backgroundColor: '#dfcffa',
            },
          }}
        />
        <Stack.Screen
          name="Entry"
          component={NewEntryScreen}
          options={{
            headerTitle: "Diary",
            headerStyle: {
              backgroundColor: '#dfcffa',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  save_btn: {
    margin:25,
    fontSize: 14,
    fontWeight: "bold"
  }
})

export default App;
