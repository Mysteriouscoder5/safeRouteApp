import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { COLORS, INSETS, SIZES, STYLES } from "../../constants/theme";
import { FontAwesome5, Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import Line from "../Line";
import { useDispatch, useSelector } from "react-redux";
import {
  saveEmergencyContact,
  updateEmergencyContact,
  updateProfile,
} from "../../redux/reducers/profileReducer";
import { loadUser } from "../../redux/reducers/userReducer";

const AddContactModal = ({
  modalVisible,
  setModalVisible,
  title,
  contactForEditing,
}) => {
  const insets = INSETS();
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (contactForEditing && Object.keys(contactForEditing).length > 0) {
      setContactName(contactForEditing?.contactName);
      setContactPhone(contactForEditing?.contactPhone?.toString());
    }
  }, [contactForEditing]);

  return (
    <View>
      <Modal
        style={{ margin: 0 }}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriverForBackdrop
        avoidKeyboard
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: SIZES.width,
            // height: SIZES.height * 0.5,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.m,
            borderTopRightRadius: SIZES.m,
            padding: SIZES.m,
            paddingBottom: insets.bottom + SIZES.m,
          }}
        >
          <View style={{ flex: 1, gap: SIZES.m }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  textTransform: "uppercase",
                  fontSize: SIZES.m,
                  color: COLORS.black,
                }}
              >
                {title ? title : "add contact"}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            <Line />
            <View style={{ gap: SIZES.m }}>
              <TextInput
                style={{
                  padding: SIZES.m,
                  borderRadius: SIZES.m,
                  fontFamily: "medium",
                  backgroundColor: COLORS.white,
                  fontSize: SIZES.m,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                placeholder="Enter contact name"
                placeholderTextColor={COLORS.aluminium}
                value={contactName}
                onChangeText={(text) => setContactName(text)}
                onFocus={() => {}}
              />
              <TextInput
                maxLength={10}
                style={{
                  padding: SIZES.m,
                  borderRadius: SIZES.m,
                  fontFamily: "medium",
                  backgroundColor: COLORS.white,
                  fontSize: SIZES.m,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  color: COLORS.black,
                }}
                placeholder="Enter contact phone"
                placeholderTextColor={COLORS.aluminium}
                value={contactPhone}
                onChangeText={(text) => setContactPhone(text)}
                onFocus={() => {}}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={[STYLES.button]}
                disabled={loading}
                onPress={() => {
                  if (contactForEditing) {
                    dispatch(
                      updateEmergencyContact({
                        contactName,
                        contactPhone,
                        _id: contactForEditing?._id,
                      })
                    )
                      .unwrap()
                      .then((result) => {
                        if (result.success) {
                          setModalVisible(false);
                          dispatch(loadUser());
                        }
                      });
                    return;
                  }

                  dispatch(saveEmergencyContact({ contactName, contactPhone }))
                    .unwrap()
                    .then((result) => {
                      if (result.success) {
                        setModalVisible(false);
                        dispatch(loadUser());
                      }
                    });
                }}
              >
                {loading ? (
                  <ActivityIndicator color={"white"} size={"small"} />
                ) : (
                  <Text style={[STYLES.buttonText]}>save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddContactModal;

const styles = StyleSheet.create({});
