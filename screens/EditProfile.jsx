import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import { COLORS, INSETS, SHADOWS, SIZES, STYLES } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/reducers/profileReducer";
import { loadUser } from "../redux/reducers/userReducer";

const EditProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { loading, success } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [physicalDisability, setPhysicalDisability] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const genders = ["male", "female", "others"];

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUsername(user?.username || "");
      setAge(user?.age?.toString() || "");
      setGender(user?.gender || "");
      setPhysicalDisability(user?.physicalDisability || "");
      setMedicalCondition(user?.medicalCondition || "");
      setHomeAddress(user?.homeAddress || "");
    }
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <TopHeader title={"edit profile"} />
        <ScrollView
          contentContainerStyle={{ rowGap: SIZES.l, padding: SIZES.s }}
        >
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Enter your name"
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>age</Text>
            <TextInput
              style={styles.textInput}
              value={age}
              onChangeText={(text) => setAge(text)}
              placeholder="Enter your age"
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>gender</Text>
            <View
              style={{
                flexDirection: "row",
                gap: SIZES.m,
                alignItems: "center",
              }}
            >
              {genders?.map((item, i) => (
                <Pressable
                  key={i}
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 6,
                    borderRadius: SIZES.s,
                    paddingHorizontal: SIZES.m,
                    borderColor: gender === item ? COLORS.black : COLORS.white,
                    borderWidth: 1,
                  }}
                  onPress={() => setGender(item)}
                >
                  <Text
                    style={{
                      color: COLORS.black,
                      textTransform: "capitalize",
                      fontFamily: "medium",
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>physical disability</Text>
            <TextInput
              style={styles.textInput}
              value={physicalDisability}
              onChangeText={(text) => setPhysicalDisability(text)}
              placeholder="Enter physical disability"
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>medical condition</Text>
            <TextInput
              style={styles.textInput}
              value={medicalCondition}
              onChangeText={(text) => setMedicalCondition(text)}
              placeholder="Enter medical condition"
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.label}>home address</Text>
            <TextInput
              style={styles.textInput}
              value={homeAddress}
              onChangeText={(text) => setHomeAddress(text)}
              placeholder="Enter your home address"
            />
          </View>
        </ScrollView>
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
            disabled={loading}

            onPress={() => {
              dispatch(
                updateProfile({
                  username,
                  age,
                  gender,
                  physicalDisability,
                  medicalCondition,
                  homeAddress,
                })
              )
                .unwrap()
                .then((result) => {
                  if (result?.success) {
                    dispatch(loadUser());
                    navigation.goBack();
                  }
                });
            }}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} size={"small"} />
            ) : (
              <Text style={[STYLES.buttonText]}>save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  label: {
    color: COLORS.black,
    textTransform: "capitalize",
    fontFamily: "medium",
  },
  textInput: {
    fontFamily: "medium",
    color: COLORS.black,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
  },
});
