import { StyleSheet, Text, View, Dimensions,Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, Foundation, AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoffeScreen from "../../screens/BottomTabBarScreen/CoffeScreen/CoffeScreen";
import ProfileScreen from "../../screens/BottomTabBarScreen/ProfileScreen/ProfileScreen";
import SocialScreen from "../../screens/BottomTabBarScreen/SocialScreen/SocialScreen";
import WalletScreen from "../../screens/BottomTabBarScreen/WalletScreen/WalletScreen";

const { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const insets = useSafeAreaInsets();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    }
  );

  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      setKeyboardHeight(0);
    }
  );

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
}, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00623B",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FCFFFE",
          position: "absolute",
          bottom: height * 0.05,
          marginHorizontal: width * 0.03,
          height: height * 0.08,
          borderRadius: 50,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowOpacity: 0.04,
          shadowOffset: {
            width: width * 0.01,
            height: height * 0.01,
          },
          paddingHorizontal: width * 0.02,
          paddingTop: keyboardHeight > 0 ? 0 : insets.bottom + height * 0.0001,

        },
        tabBarLabelStyle: {
         display: "none", // Label'ları kaldırmak için bu satırı ekleyin.
        },
      }}
    >
      <Tab.Screen
        name="CoffeScreen"
        component={CoffeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="SocialScreen"
        component={SocialScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="heart" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  //  backgroundColor: "red",
  },
});
