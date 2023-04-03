import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import OnboardingIntroScreen from '../../screens/SplashScreen/OnboardingIntroScreen';
import LoginScreen from '../../screens/LoginAndRegister/LoginScreen';
import RegisterScreen from '../../screens/LoginAndRegister/RegisterScreen';
import LetsGoScreen from '../../screens/LoginAndRegister/LetsGoScreen';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import BottomTabNavigation from '../BottomTabNavigation/BottomTabNavigation';
import ForgotPassword from '../../screens/LoginAndRegister/ForgotPassword';
import MailScreen from '../../screens/LoginAndRegister/MailScreen';
import ShowCoffe from '../../screens/BottomTabBarScreen/CoffeScreen/ShowCoffe';


const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
    initialRouteName="SplashScreen"
    >
      <Stack.Screen 
      name="SplashScreen" 
      component={SplashScreen} 
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="OnboardingIntroScreen"
      component={OnboardingIntroScreen}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerShown: false
      }}
      />
     

      <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="LetsGoScreen"
      component={LetsGoScreen}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false
      }}
      />
   
       <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="MailScreen"
      component={MailScreen}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="BottomTabNavigation"
      component={BottomTabNavigation}
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
      name="ShowCoffe"
      component={ShowCoffe}
      options={{
        headerShown: false
      }}
      />

    

    </Stack.Navigator>
  )
}

export default StackScreen

const styles = StyleSheet.create({})