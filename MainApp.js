import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainArtistScreen from "./welcomeToRising/MainArtistScreen";

const Drawer = createDrawerNavigator();

export default function MainApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainArtistScreen">
        <Drawer.Screen
          name="MainArtistScreen"
          component={MainArtistScreen}
          options={{ headerShown: true }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
