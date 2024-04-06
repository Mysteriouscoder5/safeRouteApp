import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

const Line = ({ style }) => {
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: COLORS.grey2,
          opacity: 0.1,
          borderRadius: SIZES.m,
        },
        style,
      ]}
    ></View>
  );
};

export default Line;

const styles = StyleSheet.create({});
