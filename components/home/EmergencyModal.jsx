import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { COLORS, INSETS, SIZES, STYLES } from "../../constants/theme";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";

const EmergencyModal = ({ modalVisible, setModalVisible }) => {
  const insets = INSETS();
  return (
    <View>
      <Modal
        style={{ margin: 0 }}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver
        useNativeDriverForBackdrop
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: SIZES.width,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.m,
            borderTopRightRadius: SIZES.m,
            padding: SIZES.m,
            paddingBottom: insets.bottom + SIZES.m,
          }}
        >
          <View style={{ flex: 1, gap: SIZES.m }}>
            <TouchableOpacity
              style={[
                STYLES.button,
                {
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.xs,
                },
              ]}
            >
              <FontAwesome5 name="fire" size={SIZES.l} color={COLORS.primary} />
              <Text style={[STYLES.buttonText, { color: COLORS.primary }]}>
                sos ( save our souls )
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                STYLES.button,
                {
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.xs,
                },
              ]}
            >
              <Ionicons name="call" size={SIZES.l} color={COLORS.primary} />
              <Text style={[STYLES.buttonText, { color: COLORS.primary }]}>
                emergency contact
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmergencyModal;

const styles = StyleSheet.create({});