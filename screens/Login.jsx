import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, INSETS, SIZES, STYLES } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { emailLogin, registerUser } from "../redux/reducers/userReducer";
// import {
//   getAuth,
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
// } from "firebase/auth";
// import { auth } from "../db/firebase";
// import auth from "@react-native-firebase/auth";

const Login = () => {
  const [loginTab, setLoginTab] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91 762-033-0512");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  // const login = async () => {
  //   const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
  //   if (!confirmationResult) {
  //     return;
  //   }
  //   confirmationResult.confirm();
  // };
  // async function signInWithPhoneNumber(phoneNumber) {
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  // }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }
  const clearFields = () => {
    setEmail("");
    setPassword("");
    if (!loginTab) setUsername("");
  };
  if (!confirm) {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              padding: SIZES.xl,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: SIZES.xxl,
              paddingTop: SIZES.xxl + INSETS().top,
            }}
          >
            <Text
              style={{
                fontFamily: "bold",
                fontSize: SIZES.xxl,
                textTransform: "uppercase",
                color: COLORS.white,
              }}
            >
              SAFEROUTE
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
              borderTopRightRadius: SIZES.xxl,
              borderTopLeftRadius: SIZES.xxl,
              padding: SIZES.xxl,
              gap: SIZES.xxl + 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: SIZES.m,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!loginTab) {
                    setLoginTab(true);
                    clearFields();
                  }
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: SIZES.s,
                  borderBottomWidth: 4,
                  borderBottomColor: COLORS.primary,
                  borderBottomLeftRadius: SIZES.m,
                  borderBottomRightRadius: SIZES.m,
                  opacity: loginTab ? 1 : 0.1,
                }}
              >
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontSize: SIZES.l,
                    fontFamily: "bold",
                    color: COLORS.primary,
                  }}
                >
                  log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (loginTab) {
                    setLoginTab(false);
                    clearFields();
                  }
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: SIZES.s,
                  borderBottomWidth: 4,
                  borderBottomColor: COLORS.primary,
                  borderBottomLeftRadius: SIZES.m,
                  borderBottomRightRadius: SIZES.m,
                  opacity: !loginTab ? 1 : 0.1,
                }}
              >
                <Text
                  style={{
                    textTransform: "capitalize",
                    fontSize: SIZES.l,
                    fontFamily: "bold",
                    color: COLORS.primary,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: SIZES.m }}>
              {!loginTab && (
                <TextInput
                  style={{
                    padding: SIZES.l,
                    borderRadius: SIZES.m,
                    fontFamily: "medium",
                    backgroundColor: COLORS.bg,
                    fontSize: SIZES.m,
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                  }}
                  placeholder="Enter an username"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  onFocus={() => {}}
                />
              )}
              <TextInput
                style={{
                  padding: SIZES.l,
                  borderRadius: SIZES.m,
                  fontFamily: "medium",
                  backgroundColor: COLORS.bg,
                  fontSize: SIZES.m,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={() => {}}
              />
              <TextInput
                style={{
                  padding: SIZES.l,
                  borderRadius: SIZES.m,
                  fontFamily: "medium",
                  backgroundColor: COLORS.bg,
                  fontSize: SIZES.m,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                keyboardType="default"
                secureTextEntry
                placeholder="Enter valid password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                onFocus={() => {}}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (!loginTab) {
                    dispatch(registerUser({ username, email, password }));
                    return;
                  }
                  dispatch(emailLogin({ email, password }));
                }}
                style={[
                  {
                    backgroundColor: COLORS.primary,
                    padding: SIZES.l,
                    borderRadius: SIZES.l,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "bold",
                    textTransform: "uppercase",
                    fontSize: SIZES.m,
                    color: COLORS.white,
                  }}
                >
                  continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <TouchableOpacity onPress={() => confirmCode()}>
        <Text>confirm code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
