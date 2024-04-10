import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import TopHeader from "../components/TopHeader";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, INSETS, SHADOWS, SIZES, STYLES } from "../constants/theme";
import { UserIcon as UserIconSolid } from "react-native-heroicons/solid";
import AddContactModal from "../components/emergencyContactList/addContactModal";
import {
  deleteEmergencyContact,
  updateProfile,
} from "../redux/reducers/profileReducer";
import { loadUser } from "../redux/reducers/userReducer";

const EmergencyContactList = () => {
  const { user } = useSelector((state) => state.user);
  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const [selectedContactForEditing, setSelectedContactForEditing] =
    useState(null);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <TopHeader title={"emergency contact list"} />

      <FlatList
        data={user?.emergencyContactList}
        ListEmptyComponent={
          <View
            style={{
              height: SIZES.height * 0.7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "bold",
                fontSize: SIZES.m,
                color: COLORS.aluminium,
                textTransform: "uppercase",
              }}
            >
              no contacts saved
            </Text>
          </View>
        }
        contentContainerStyle={{ padding: SIZES.s, rowGap: SIZES.m }}
        renderItem={({ item }) => (
          <View
            style={{
              borderRadius: SIZES.m,
              backgroundColor: COLORS.white,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                padding: SIZES.m,
                flexDirection: "row",
                gap: SIZES.m,
                alignItems: "center",
              }}
            >
              <View>
                <UserIconSolid color={COLORS.primary} size={20} />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "medium",
                    textTransform: "capitalize",
                  }}
                >
                  {item?.contactName}
                </Text>
                <Text
                  style={{
                    fontFamily: "medium",
                    fontSize: SIZES.s,
                    color: COLORS.grey2,
                  }}
                >
                  {item?.contactPhone}
                </Text>
              </View>
              {user?.primaryEmergencyContact?.toString() ===
                item?.contactPhone?.toString() && (
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 5,
                    marginLeft: "auto",
                  }}
                >
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontFamily: "medium",
                      color: COLORS.white,
                      fontSize: SIZES.s,
                      paddingHorizontal: SIZES.s,
                    }}
                  >
                    primary
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: SIZES.m,
                paddingBottom: SIZES.m,
                paddingLeft: 20 + SIZES.m * 2,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedContactForEditing(item);
                  setOpenAddContactModal(true);
                }}
              >
                <Text
                  style={{
                    fontFamily: "semibold",
                    textTransform: "uppercase",
                    color: COLORS.primary,
                  }}
                >
                  edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteEmergencyContact(item))
                    .unwrap()
                    .then((result) => {
                      if (result.success) {
                        dispatch(loadUser());
                      }
                    });
                }}
              >
                <Text
                  style={{
                    fontFamily: "semibold",
                    textTransform: "uppercase",
                    color: COLORS.primary,
                  }}
                >
                  delete
                </Text>
              </TouchableOpacity>
              {user?.primaryEmergencyContact?.toString() !==
                item?.contactPhone?.toString() && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      updateProfile({
                        primaryEmergencyContact: item?.contactPhone,
                      })
                    )
                      .unwrap()
                      .then((result) => {
                        if (result.success) {
                          dispatch(loadUser());
                        }
                      });
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "semibold",
                      textTransform: "uppercase",
                      color: COLORS.primary,
                    }}
                  >
                    mark as primary
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      <View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: SIZES.s,
            paddingBottom: INSETS().bottom,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.m,
            borderTopRightRadius: SIZES.m,
          },
          SHADOWS.small,
        ]}
      >
        <TouchableOpacity
          style={[STYLES.button]}
          onPress={() => setOpenAddContactModal(true)}
        >
          <Text style={[STYLES.buttonText]}>add</Text>
        </TouchableOpacity>
      </View>
      {openAddContactModal && (
        <AddContactModal
          modalVisible={openAddContactModal}
          setModalVisible={setOpenAddContactModal}
          contactForEditing={selectedContactForEditing || null}
          title={selectedContactForEditing && "edit contact"}
        />
      )}
    </View>
  );
};

export default EmergencyContactList;

const styles = StyleSheet.create({});
