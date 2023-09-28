import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RSContextProvider, {
  RSContext,
} from "./welcomeToRising/Context/RSContextProvider";
import WelcomeScreen from "./welcomeToRising/WelcomeScreen";
import Login from "./welcomeToRising/Login";
import RegistrationArtists from "./welcomeToRising/RegistrationArtists";
import RegistrationPlanBussines from "./welcomeToRising/RegistrarionBussines/RegistrationPlanBussines";
import RegistrationBussines from "./welcomeToRising/RegistrarionBussines/RegistrationBussines";
import RegistrationPayment from "./welcomeToRising/RegistrarionBussines/RegistrationPayment";
import Admin from "./welcomeToRising/AdminPage/Admin";
import PushNotification from "./welcomeToRising/PushNotification";
import ProfilePageArtist from "./ProfilePageArtist";
import MainArtistScreen from "./welcomeToRising/MainArtistScreen";
import Profile from "./welcomeToRising/AfterLoginArtists/Profile";
import Statics from "./welcomeToRising/AfterLoginArtists/Statics";
import Help from "./welcomeToRising/AfterLoginArtists/Help";
import Logout from "./welcomeToRising/AfterLoginArtists/Logout";
import MainBusinessScreen from "./welcomeToRising/AfterLoginBusiness/MainBusinessScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RSContextProvider>
      <AppNavigator />
    </RSContextProvider>
  );
}

function AppNavigator() {
  const { showMainArtistScreen, showMainBusinessScreen } =
    React.useContext(RSContext);

  const renderAdditionalScreens = () => {
    if (showMainArtistScreen) {
      return (
        <Drawer.Navigator initialRouteName="MainArtistScreen">
          <Drawer.Screen
            name="My Shows"
            component={MainArtistScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#86a6d9",
              },
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#ba99b6",
              },
            }}
          />
          <Drawer.Screen
            name="Statics"
            component={Statics}
            options={{ headerShown: true }}
          />
          <Drawer.Screen
            name="Help"
            component={Help}
            options={{ headerShown: true }}
          />
          <Drawer.Screen
            name="Logout"
            component={Logout}
            options={{ headerShown: true }}
          />
        </Drawer.Navigator>
      );
    } else {
      return (
        <Drawer.Navigator initialRouteName="MainArtistScreen">
          <Drawer.Screen
            name="Home"
            component={MainBusinessScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#86a6d9",
              },
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#ba99b6",
              },
            }}
          />
          <Drawer.Screen
            name="Upcoming"
            component={Statics}
            options={{ headerShown: true }}
          />
          <Drawer.Screen
            name="Help"
            component={Help}
            options={{ headerShown: true }}
          />
          <Drawer.Screen
            name="Logout"
            component={Logout}
            options={{ headerShown: true }}
          />
        </Drawer.Navigator>
      );
    }
  };

  return (
    <NavigationContainer>
      {showMainArtistScreen || showMainBusinessScreen ? (
        renderAdditionalScreens()
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistrationArtists"
            component={RegistrationArtists}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistrationPlanBussines"
            component={RegistrationPlanBussines}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistrationBussines"
            component={RegistrationBussines}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistrationPayment"
            component={RegistrationPayment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PushNotification"
            component={PushNotification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfilePageArtist"
            component={ProfilePageArtist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainArtistScreen"
            component={MainArtistScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#E7E4E4",
  },
});
