import { auth, db } from "@/config/firebaseConfig";
import validationSchema from "@/utils/authSchema";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignUp() {
  const router = useRouter();

  const handleSignup = async (values: any) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;
      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        createdAt: new Date(),
      });
      await AsyncStorage.setItem("userEmail", values.email);
      router.push("/(tabs)/home");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed!",
          "This email address is already in use. Please use a different email.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Signup Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    }
  };
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image
            source={require("@/assets/images/dinetimelogo.png")}
            style={{
              width: 200,
              height: 100,
            }}
          />
          <Text className="text-lg text-center text-white font-bold mb-10">
            Let&apos;s get you started
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full">
                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2 ">
                      {errors.email}
                    </Text>
                  )}

                  <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2 ">
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className="p-2 my-2 bg-[#f49b33] text-black rounded-lg mt-10"
                  >
                    <Text className="text-lg font-semibold text-center">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View>
              <TouchableOpacity
                className="flex-row items-center mt-5 p-2 justify-center gap-1"
                onPress={() => router.push("/signin")}
              >
                <Text className="text-white font-semibold">
                  Already a User?
                </Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">
                  Sign in
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center mb-4">
                <View className="border-b-2 border-[#f49b33] p-2 mb-2 w-24" />
                <Text className="text-white font-semibold mx-1">or</Text>
                <View className="border-b-2 border-[#f49b33] p-2 mb-2 w-24" />
              </View>

              <TouchableOpacity
                className="flex-row items-center mb-5 p-2 justify-center gap-1"
                onPress={() => router.push("/(tabs)/home")}
              >
                <Text className="text-white font-semibold">Be a</Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">
                  Guest User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={require("@/assets/images/Frame.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <StatusBar barStyle={"light-content"} backgroundColor={"2b2b2b"} />
      </ScrollView>
    </SafeAreaView>
  );
}
