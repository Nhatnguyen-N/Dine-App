import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className={`bg-[#2b2b2b] flex-1`}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image
            source={require("@/assets/images/dinetimelogo.png")}
            style={{
              width: 300,
              height: 300,
            }}
          />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              className="p-2 my-2 bg-[#f49b33] text-black rounded-lg"
            >
              <Text className="text-lg font-semibold text-center">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home")}
              className=" p-2 my-2 bg-[#2b2b2b] border border-[#f49b33] rounded-lg"
            >
              <Text className="text-lg font-semibold text-[#f49b33] text-center">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View className="flex-row items-center justify-center my-4">
              <View className="border-b-2 border-[#f49b33] p-2 mb-2 w-24" />
              <Text className="text-white font-semibold mx-1">or</Text>
              <View className="border-b-2 border-[#f49b33] p-2 mb-2 w-24" />
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-center"
              onPress={() => router.push("/signin")}
            >
              <Text className="text-white font-semibold">Already a User?</Text>
              <Text className="text-base font-semibold underline text-[#f49b33]">
                Sign in
              </Text>
            </TouchableOpacity>
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
