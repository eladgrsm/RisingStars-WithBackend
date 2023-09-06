import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import WeeklyCalendar from "./AfterLoginArtists/WeeklyCalendar";

export default function MainArtistScreen() {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.weeklyTitle}>
        <Text>Weekly Calendar</Text>
      </View>
      <View style={styles.calendar}>
        <WeeklyCalendar />
      </View>
      <TouchableOpacity style={styles.centeredCircleButton}>
        <View style={styles.circleImage}>
          <Image
            source={require("../assets/redilosion.jpg")}
            style={styles.circleImage}
          />
          <Text style={styles.circleText}>Shows</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  weeklyTitle: {
    width: "70%",
    padding: 15,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,
  },
  calendar: {
    flex: 1,
    paddingTop: 20,
  },
  centeredCircleButton: {
    alignItems: "center",
    position: "absolute",
    bottom: 115,
    width: "100%",
  },
  circleImage: {
    width: 150, 
    height: 150,
    borderRadius: 90, 
    backgroundColor: "blue", 
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circleText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    alignSelf: "center",
    bottom: 45,
  },
});
