import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS, INSETS, SHADOWS, SIZES, STYLES } from "../constants/theme";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/reducers/userReducer";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const insets = INSETS();
  const tabs = [
    {
      title: "edit profile",
      icon: <Feather name="edit" size={SIZES.m} color={COLORS.black} />,
      onPress: () => {},
    },
    {
      title: "logout",
      icon: <MaterialIcons name="logout" size={SIZES.l} color={COLORS.black} />,
      onPress: () => {
        dispatch(logOut());
      },
    },
  ];
  return (
    <View style={STYLES.container}>
      <View
        style={[
          {
            padding: SIZES.m,
            paddingTop: insets.top + SIZES.m,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomLeftRadius: SIZES.m,
            borderBottomRightRadius: SIZES.m,
          },
          SHADOWS.small,
        ]}
      >
        <View>
          <Text
            style={{
              fontFamily: "semibold",
              color: COLORS.white,
              textTransform: "capitalize",
              fontSize: SIZES.m,
              opacity: 0.5,
            }}
          >
            welcome,
          </Text>
          <Text
            style={{
              fontFamily: "bold",
              color: COLORS.white,
              textTransform: "capitalize",
              fontSize: SIZES.l,
            }}
          >
            {user?.username}
          </Text>
        </View>
        <View>
          <Ionicons
            name="person-circle-sharp"
            size={SIZES.xxl}
            color={COLORS.white}
          />
        </View>
      </View>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, padding: SIZES.m }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SIZES.m,
            padding: SIZES.m,
            borderRadius: SIZES.m,
            backgroundColor: COLORS.white,
          }}
        >
          <Feather name="edit" size={SIZES.m} color={COLORS.black} />
          <View>
            <Text
              style={{
                fontFamily: "medium",
                textTransform: "capitalize",
                color: COLORS.black,
              }}
            >
              edit profile
            </Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <AntDesign name="right" size={SIZES.m} color={COLORS.black} />
          </View>
        </TouchableOpacity>
      </ScrollView> */}
      <FlatList
        data={tabs}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, padding: SIZES.m, rowGap: SIZES.m }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.m,
              padding: SIZES.m,
              borderRadius: SIZES.m,
              backgroundColor: COLORS.white,
            }}
            onPress={item.onPress}
          >
            {item.icon}
            <View>
              <Text
                style={{
                  fontFamily: "medium",
                  textTransform: "capitalize",
                  color: COLORS.black,
                }}
              >
                {item.title}
              </Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
              <AntDesign name="right" size={SIZES.m} color={COLORS.black} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
