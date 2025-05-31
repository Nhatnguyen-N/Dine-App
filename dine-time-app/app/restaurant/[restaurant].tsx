import {
  View,
  Text,
  Platform,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import {
  CarouseImageType,
  RestaurantType,
  SlotType,
} from "@/assets/types/restaurants.types";
import { Ionicons } from "@expo/vector-icons";
import DatePickerComp from "@/components/restaurant/DatePickerComp";
import GuestPickerComp from "@/components/restaurant/GuestPickerComp";
import FindSlots from "@/components/restaurant/FindSlots";

export default function Restaurant() {
  const { restaurant } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);
  const windowWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [restaurantData, setRestaurantData] = useState<
    RestaurantType | DocumentData
  >([]);
  const [carouselData, setCarouselData] = useState<
    CarouseImageType[] | DocumentData[]
  >([]);
  const [slotData, setSlotData] = useState<DocumentData[] | SlotType[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
    if (currentIndex === carouselLength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrevImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
    if (currentIndex === 0) {
      const prevIndex = carouselLength - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };
  const carouselItem = ({ item }: { item: any }) => {
    return (
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%",
          }}
        >
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color={"white"}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "2%",
          }}
        >
          <Ionicons
            onPress={handlePrevImage}
            name="arrow-back"
            size={24}
            color={"white"}
          />
        </View>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            transform: [{ translateX: -50 }],
            zIndex: 10,
            bottom: 15,
          }}
        >
          {carouselData[0].images?.map(
            ({ item }: { item: CarouseImageType }, i: number) => (
              <View
                key={i}
                className={`bg-white h-2 w-2 ${
                  i === currentIndex && "h-3 w-3"
                } p-1 mx-1 rounded-full`}
              />
            )
          )}
        </View>
        <Image
          source={{ uri: item }}
          style={{
            opacity: 0.5,
            backgroundColor: "black",
            marginRight: 20,
            marginLeft: 5,
            borderRadius: 25,
          }}
          className="h-64"
        />
      </View>
    );
  };

  const getRestaurantData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant)
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);
      if (restaurantSnapshot.empty) {
        console.log("No matching restaurant found");
        return;
      }
      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);
        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", doc.ref)
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages: DocumentData[] = [];

        if (carouselSnapshot.empty) {
          console.log("No matching carousel found");
          return;
        }

        carouselSnapshot.forEach((carouselDoc) => {
          carouselImages.push(carouselDoc.data());
        });
        setCarouselData(carouselImages);

        const slotQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", doc.ref)
        );
        const slotsSnapshot = await getDocs(slotQuery);
        const slots: DocumentData[] = [];
        if (slotsSnapshot.empty) {
          console.log("No matching slot found");
          return;
        }
        slotsSnapshot.forEach((slotDoc) => {
          slots.push(slotDoc.data());
        });
        setSlotData(slots);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/GnCt35jZ81M5AhRY7";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URL", url);
    }
  };

  useEffect(() => {
    getRestaurantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS === "android"
          ? { paddingBottom: 50 }
          : { paddingBottom: 20 },
      ]}
    >
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2 ">
          <Text className="text-xl text-[#f49b33] mr-2 font-semibold">
            {restaurant}
          </Text>
          <View className="border-b border-[#f49b33]" />
        </View>
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 25 }}
          />
        </View>
        <View className="flex-1 flex-row mt-2 p-2 ">
          <Ionicons name="location-sharp" size={24} color={"#f49b33"} />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} |{"  "}
            <Text
              onPress={handleLocation}
              className="underline items-center mt-1 text-[#f49b33] italic font-semibold"
            >
              Get Direction
            </Text>
          </Text>
        </View>

        <View className="flex-1 flex-row p-2 items-center">
          <Ionicons name="time" size={20} color={"#f49b33"} />
          <Text className="max-w-[75%] mx-2 font-semibold text-white">
            {restaurantData?.opening} - {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg">
          <View className=" flex-1 flex-row m-2 p-2 items-center justify-end">
            <View className="flex-1 flex-row">
              <Ionicons name="calendar" size={20} color={"#f49b33"} />
              <Text className="text-white mx-2 text-base">
                Select booking date
              </Text>
            </View>
            <DatePickerComp date={date} setDate={setDate} />
          </View>

          <View className=" flex-1 flex-row bg-[#474747] rounded-lg m-2 p-2 items-center justify-end">
            <View className="flex-1 flex-row">
              <Ionicons name="people" size={20} color={"#f49b33"} />
              <Text className="text-white mx-2 text-base">
                Select number of guests
              </Text>
            </View>
            <GuestPickerComp
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </View>
        </View>
        <View className="flex-1">
          <FindSlots
            restaurant={restaurant as string}
            date={date}
            slots={slotData as SlotType[]}
            selectedNumber={selectedNumber}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
