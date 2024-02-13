import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import { OSNotification, OneSignal } from "react-native-onesignal";
import { NotificationEventTypeMap } from "react-native-onesignal/dist/models/NotificationEvents";
import { Notification } from "../components/Notification";
import * as Linking from "expo-linking";

const linking = {
  prefixes: [
    "igniteshoesapp://",
    "com.kscottp.igniteshoesapp://",
    "exp+igniteshoesapp://",
  ],
  config: {
    screens: {
      details: {
        path: "details/:productId",
        parse: {
          productId: (productId: string) => productId,
        },
      },
    },
  },
};

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification | undefined>(
    undefined
  );

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  // const deepLinking = Linking.createURL("details", {
  //   queryParams: { productId: "7" },
  // });

  // console.log(deepLinking);

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (
        notificationReceivedEvent: NotificationEventTypeMap["foregroundWillDisplay"]
      ) => {
        console.log(notificationReceivedEvent);
        setNotification(notificationReceivedEvent.getNotification());
      }
    );

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => {
            setNotification(undefined);
          }}
        />
      )}
    </NavigationContainer>
  );
}
