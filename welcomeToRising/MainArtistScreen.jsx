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
        <Text>Upcoming Information</Text>
      </View>
      <View style={styles.notifiction}></View>
      <View style={styles.TodayShow}>
        <Text>Today Show:</Text>
      </View>
      <Text style={styles.availableShow}>Click here to see available shows:</Text>
      <TouchableOpacity style={styles.centeredCircleButton}>
        <View style={styles.circleImage}>
          <Image
            source={require("../assets/Golden_star.svg.png")}
            style={styles.circleImage}
          />
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
    width: "80%",
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
  centeredCircleButton: {
    alignItems: "center",
    position: "absolute",
    bottom: 115,
    width: "100%",
  },
  circleImage: {
    width: 160,
    height: 160,
    borderRadius: 90,
    backgroundColor: "grey",
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
  notifiction: {
    borderWidth: 1,
    width: "80%",
    height: 100,
    borderRadius: 20,
    marginTop: 25,
    backgroundColor: "#faf3f2",
  },
  TodayShow: {
    borderWidth: 1,
    width: "80%",
    height: 150,
    borderRadius: 20,
    marginTop: 25,
    backgroundColor: "#faf3f2",
    alignItems: "center",
  },
  availableShow: {
    marginTop: 80,
  }
});
