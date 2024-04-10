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
  Foundation,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/reducers/userReducer";
import Line from "../components/Line";

const Profile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const insets = INSETS();
  const tabs = [
    {
      title: "edit profile",
      icon: <Feather name="edit" size={SIZES.m} color={COLORS.black} />,
      onPress: () => {
        navigation.navigate("EditProfile");
      },
    },
    {
      title: "emergency contact list",
      icon: (
        <Foundation
          name="clipboard-notes"
          size={SIZES.m}
          color={COLORS.black}
        />
      ),
      onPress: () => {
        navigation.navigate("EmergencyContactList");
      },
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

      <FlatList
        data={tabs}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, padding: SIZES.m, rowGap: SIZES.m }}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: SIZES.l,
              padding: SIZES.m,
              borderColor: COLORS.black,
              borderWidth: 1,
              gap: SIZES.s,
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                textTransform: "capitalize",
                color: COLORS.black,
                fontSize: SIZES.l,
              }}
            >
              Personal information
            </Text>
            <Line style={{ opacity: 0.1 }} />
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: SIZES.m,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    flex: 1,
                  }}
                >
                  Age
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    color: COLORS.grey2,
                    flex: 1,
                  }}
                >
                  {user?.age || "--"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: SIZES.m,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    flex: 1,
                  }}
                >
                  gender
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    color: COLORS.grey2,
                    flex: 1,
                  }}
                >
                  {user?.gender || "--"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: SIZES.m,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",

                    flex: 1,
                  }}
                >
                  primary emergency contact
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    color: COLORS.grey2,
                    flex: 1,
                  }}
                >
                  {user?.primaryEmergencyContact || "--"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: SIZES.m,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",

                    flex: 1,
                  }}
                >
                  physical disability
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    color: COLORS.grey2,
                    flex: 1,
                  }}
                >
                  {user?.physicalDisability || "--"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: SIZES.m,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",

                    flex: 1,
                  }}
                >
                  medical condition
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    color: COLORS.grey2,
                    flex: 1,
                  }}
                >
                  {user?.medicalCondition || "--"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: SIZES.m,
                }}
              >
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    flex: 1,
                  }}
                >
                  Home address
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                    color: COLORS.grey2,
                    flex: 1,
                  }}
                >
                  {user?.homeAddress || "--"}
                </Text>
              </View>
            </View>
          </View>
        }
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
