import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, SIZES } from "../constants/theme";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const size = 24;
const BottomNavigation = () => {
  const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
      elevation: 0,
      height:
        Platform.OS === "ios"
          ? SIZES.bottomNavbarHeight
          : SIZES.bottomNavbarHeight - 20,
      position: "absolute",
      bottom: 0,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={size}
                color={focused ? COLORS.primary : COLORS.grey2}
              />
            );
          },
          tabBarLabelStyle: {
            color: COLORS.black,
            fontFamily: "semibold",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person-sharp" : "person-outline"}
                size={size}
                color={focused ? COLORS.primary : COLORS.grey2}
              />
            );
          },
          tabBarLabelStyle: {
            color: COLORS.black,
            fontFamily: "semibold",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
