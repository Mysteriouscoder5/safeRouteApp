import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { COLORS, INSETS, SHADOWS, SIZES, STYLES } from "../../constants/theme";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { registerRoute } from "../../redux/reducers/routeReducer";
import { setRoomDetails } from "../../redux/reducers/roomDetailsReducer";

const List = ({ modalVisible, setModalVisible, userLocation }) => {
  const route = useSelector((state) => state.route);
  const { rooms } = useSelector((state) => state.rooms);
  const { room } = useSelector((state) => state.roomDetails);

  const dispatch = useDispatch();
  const insets = INSETS();
  const data = [
    {
      roomNumber: "1",
      temperature: "23.4°C",
      humidity: "60%",
      icon: (
        <FontAwesome6 name="person-shelter" size={24} color={COLORS.black} />
      ),
    },
    {
      roomNumber: "1",
      temperature: "23.4°C",
      humidity: "60%",
      icon: (
        <FontAwesome6 name="person-shelter" size={24} color={COLORS.black} />
      ),
    },
    {
      roomNumber: "1",
      temperature: "23.4°C",
      humidity: "60%",
      icon: (
        <FontAwesome6 name="person-shelter" size={24} color={COLORS.black} />
      ),
    },
  ];
  return (
    <View>
      <Modal
        style={{ margin: 0 }}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriverForBackdrop
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: SIZES.width,
            height: SIZES.height * 0.7,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.m,
            borderTopRightRadius: SIZES.m,
            padding: SIZES.m,
            paddingBottom: insets.bottom + SIZES.m,
          }}
        >
          <View style={{ flex: 1, gap: SIZES.m }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={
                <View
                  style={[
                    {
                      backgroundColor: COLORS.primary,
                      borderRadius: SIZES.l,
                      padding: SIZES.m,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: SIZES.m,
                    },
                    SHADOWS.small,
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1 }}
                  >
                    <Text
                      style={{
                        fontFamily: "semibold",
                        color: COLORS.white,
                        textTransform: "capitalize",
                        fontSize: SIZES.m,
                      }}
                    >
                      You are inside Room {room?.roomNumber}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        color: COLORS.white,
                        opacity: 0.5,
                        fontSize: SIZES.s,
                      }}
                    >
                      temperature {room?.temperature || "--"} °C
                    </Text>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        color: COLORS.white,
                        opacity: 0.5,
                        fontSize: SIZES.s,
                      }}
                    >
                      humidity {room?.humidity || "30"}%
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Ionicons name="close" size={30} color="white" />
                  </TouchableOpacity>
                </View>
              }
              contentContainerStyle={{ rowGap: SIZES.m }}
              data={rooms}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    // backgroundColor: COLORS.bg,
                    borderRadius: SIZES.l,
                    padding: SIZES.m,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: SIZES.m,
                    backgroundColor:
                      item?.temperature > 50 ? "rgba(255,0,0,0.5)" : COLORS.bg,
                  }}
                  onPress={() => {
                    dispatch(
                      registerRoute({
                        Room: `Room${item?.roomNumber}`,
                        Path: `w${item?.pathNumber}`,
                        Exit: `Exit${item?.exitNumber}`,
                        WayOut: `w${item?.wayOutNumber}`,
                      })
                    );
                    dispatch(setRoomDetails(item));
                    setModalVisible(false);
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        color: COLORS.black,
                        textTransform: "capitalize",
                        fontSize: SIZES.m,
                      }}
                    >
                      Room {item?.roomNumber}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        color:
                          item?.temperature > 50 ? COLORS.white : COLORS.grey2,
                        opacity: item?.temperature > 50 ? 0.8 : 0.5,
                        fontSize: SIZES.s,
                      }}
                    >
                      temperature {item?.temperature || "--"} °C
                    </Text>
                    <Text
                      style={{
                        fontFamily: "semibold",
                        color:
                          item?.temperature > 50 ? COLORS.white : COLORS.grey2,
                        opacity: item?.temperature > 50 ? 0.8 : 0.5,
                        fontSize: SIZES.s,
                      }}
                    >
                      humidity {item?.humidity || "30%"}
                    </Text>
                  </View>
                  <View>{item?.icon}</View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({});
