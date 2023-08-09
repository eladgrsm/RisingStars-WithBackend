import { useState, useEffect, useRef, useContext } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { RSContext } from "./Context/RSContextProvider";
import { API_URL } from "../variables";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function PushNotification({ navigation, closeModal }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const { saveRandomNumber, setSaveRandomNumber, artistsRegister } =
    useContext(RSContext);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [codeInputs, setCodeInputs] = useState(["", "", "", ""]);
  const codeInputRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    if (text.length <= 1) {
      const newCodeInputs = [...codeInputs];
      newCodeInputs[index] = text;
      setCodeInputs(newCodeInputs);

      if (text.length === 1 && index < 3) {
        codeInputRefs.current[index + 1].focus();
      } else if (text.length === 0 && index > 0) {
        codeInputRefs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(async () => {
    await schedulePushNotification();
  }, []);

  async function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function schedulePushNotification() {
    const randomNumber = await getRandomNumber(1000, 9999);
    await setSaveRandomNumber(randomNumber);
    console.log(saveRandomNumber);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: `Random number: ${randomNumber}`,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const SumbitArtistAndCode = async () => {
    try {
      let tempNumber = saveRandomNumber;
      for (let i = codeInputs.length - 1; i >= 0; i--) {
        let digitTempNumber = tempNumber % 10;
        if (codeInputs[i] != digitTempNumber) {
          throw new Error("The code does not match");
        }
        tempNumber = Math.floor(tempNumber / 10);
      }

      console.log(artistsRegister);
      console.log("Before the Fetch");
      const response = await fetch(API_URL + "artists/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artistsRegister),
      });

      if (response.ok) {
        Alert.alert("Thank you for sign-up");
        navigation.navigate("Login");
        closeModal();
      } else {
        throw new Error("Error signing up artist");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Please Fill The Code Here:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {codeInputs.map((code, index) => (
            <TextInput
              key={index}
              ref={(ref) => (codeInputRefs.current[index] = ref)}
              value={code}
              onChangeText={(text) => handleCodeChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              style={{
                borderBottomWidth: 1,
                width: 40,
                marginHorizontal: 5,
                textAlign: "center",
              }}
            />
          ))}
        </View>
        <Button title="Sumbit" color="green" onPress={SumbitArtistAndCode} />
        <Button
          title="Resend Code"
          onPress={async () => await schedulePushNotification()}
        />
      </View>
    </ScrollView>
  );
}
