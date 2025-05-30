import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function GuestPickerComp({
  selectedNumber,
  setSelectedNumber,
}: {
  selectedNumber: number;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  const decrement = () => {
    if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
  };
  const increment = () => {
    if (selectedNumber < 12) setSelectedNumber(selectedNumber + 1);
  };
  return (
    <View className="flex-row items-center rounded-lg text-white text-base">
      <TouchableOpacity onPress={decrement} className="rounded">
        <Text className="text-white text-lg border border-[#f49b33] rounded-l-lg px-3">
          -
        </Text>
      </TouchableOpacity>
      <Text className="px-3 text-white bg-[#474747] border border-[#474747] text-lg">
        {selectedNumber}
      </Text>
      <TouchableOpacity onPress={increment} className="rounded">
        <Text className="text-white text-lg border border-[#f49b33] rounded-r-lg px-3">
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}
