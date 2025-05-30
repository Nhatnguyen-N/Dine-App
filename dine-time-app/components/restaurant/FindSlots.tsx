import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { SlotType } from "@/assets/types/restaurants.types";

export default function FindSlots({
  slots,
  selectedSlot,
  setSelectedSlot,
  selectedNumber,
}: {
  slots: DocumentData[] | SlotType[];
  selectedNumber: number;
  selectedSlot: string | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  };
  const handleSlotPress = (slot: string) => {
    let prevSlot = selectedSlot;
    if (prevSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };
  return (
    <View className="flex-1">
      <View className={`${selectedSlot !== null && "flex-row"}`}>
        <View className={` ${selectedSlot !== null && "flex-1"}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot !== null && (
          <View className="flex-1 ">
            <TouchableOpacity>
              <Text className="text-center text-white text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {slotsVisible && (
          <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg">
            {slots[0].slot.map((slot: string, index: number) => (
              <TouchableOpacity
                key={index}
                className={`m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center 
                  ${
                    selectedSlot && selectedSlot !== slot ? "opacity-50" : ""
                  } `}
                onPress={() => handleSlotPress(slot)}
                disabled={
                  selectedSlot === slot || selectedSlot === null ? false : true
                }
              >
                <Text className="text-white font-bold">{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
