import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { OneSignal } from "react-native-onesignal";

import { CartContextProvider } from "./src/contexts/CartContext";
import {
  tagUserEmailCreate,
  tagUserInfoCreae,
} from "./src/notification/notificationsTag";
import { useEffect } from "react";

OneSignal.initialize("35d716e0-4f05-46da-842f-64f380939524");

OneSignal.User.addEmail("abc@email.com");

tagUserEmailCreate("abc@email.com");

tagUserInfoCreae();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "click",
      (response) => {
        console.log("Notification opened", JSON.stringify(response));
        const { actionId } = response.result as any;
        switch (actionId) {
          case "1":
            console.log("Action 1");
            break;
          case "2":
            console.log("Action 2");
            break;
          default:
            console.log("Default");
            break;
        }
      }
    );
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
