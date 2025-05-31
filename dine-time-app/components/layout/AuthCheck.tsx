import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router"; // Hoặc thư viện router bạn đang sử dụng
import { auth } from "@/config/firebaseConfig";

const AuthCheck = () => {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Lắng nghe sự thay đổi trạng thái xác thực
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Người dùng đã đăng nhập
        router.push("/(tabs)/home");
      } else {
        // Người dùng chưa đăng nhập
        router.push("/");
      }

      if (initializing) setInitializing(false);
    });

    // Hủy đăng ký lắng nghe khi component unmount
    return unsubscribe;
  }, [initializing, router]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default AuthCheck;
