import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, SIZES } from "../constants/theme";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { UserIcon as UserIconOutlined } from "react-native-heroicons/outline";
import { UserIcon as UserIconSolid } from "react-native-heroicons/solid";
import { HomeIcon as HomeIconOutlined } from "react-native-heroicons/outline";
import { HomeIcon as HomeIconSolid } from "react-native-heroicons/solid";

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
              <>
                {focused ? (
                  <HomeIconSolid color={COLORS.primary} size={size} />
                ) : (
                  <HomeIconOutlined color={COLORS.grey2} size={size} />
                )}
              </>
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
              <>
                {focused ? (
                  <UserIconSolid color={COLORS.primary} size={size} />
                ) : (
                  <UserIconOutlined color={COLORS.grey2} size={size} />
                )}
              </>
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
