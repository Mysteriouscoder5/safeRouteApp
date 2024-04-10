import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, INSETS, SIZES } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const TopHeader = ({ title, onBackPress }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: SIZES.s,
        paddingTop: INSETS().top + SIZES.s,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "relative",
          width: SIZES.width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", zIndex: 999, left: SIZES.s }}
          onPress={() => {
            if (onBackPress === undefined) navigation.goBack();
            else onBackPress();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: "semibold",
            textTransform: "uppercase",
            fontSize: SIZES.m,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({});
