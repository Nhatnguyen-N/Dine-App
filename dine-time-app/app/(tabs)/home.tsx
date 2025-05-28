import { BlurView } from "expo-blur";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b" }}>
      <View className="flex items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center flex-row p-2">
          <View className="flex-row flex">
            <Text
              className={`text-base h-10 pt-[${
                Platform.OS === "ios" ? 10 : 6.5
              }] align-middle text-white`}
            >
              {" "}
              Welcome to
            </Text>
            <Image
              source={require("@/assets/images/dinetimelogo.png")}
              className="w-20 h-12"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          className="my-4 w-full h-52 items-center justify-center"
          source={require("@/assets/images/homeBanner.png")}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 25}
            tint="dark"
            className="w-full p-4 shadow-lg"
          >
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
