import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackScreen from "./src/Navigation/StackNavigation/StackScreen";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackScreen />
    </NavigationContainer>
  );
};

export default App;
