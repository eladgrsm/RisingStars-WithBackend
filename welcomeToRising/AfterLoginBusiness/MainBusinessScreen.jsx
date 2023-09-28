import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  PanResponder,
  TextInput,
} from "react-native";
import DateCalendar from "./DateCalendar";

export default function MainBusinessScreen() {
  const currentDate = new Date();

  // Get the day, month, and year components from the current date
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are 0-indexed
  const year = currentDate.getFullYear();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [panResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 80) {
          closePopup();
        }
      },
    })
  );

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <Text style={styles.titleShow}>Notification:</Text>
      </View>
      <View style={styles.todayShowContainer}>
        <Text style={styles.titleShow}>Today Show:</Text>
        <Text style={styles.currentDate}>{`${day}/${month}/${year}`}</Text>
        <Text style={styles.titleTimeAndArtist}>training time:</Text>
        <Text style={styles.titleTimeAndArtist}>Artist:</Text>
      </View>
      <TouchableOpacity onPress={openPopup}>
        <Image
          source={require("./images/addIcon.png")}
          style={styles.addShow}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isPopupVisible}
        onRequestClose={closePopup}
      >
        <View style={styles.popupContainer} {...panResponder.panHandlers}>
          <DateCalendar />
          <View>
            <Text style={styles.startTime}>From Time</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  notificationContainer: {
    alignItems: "center",
    backgroundColor: "#EBC2C2",
    height: "30%",
    width: "95%",
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 45,
  },
  todayShowContainer: {
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    height: "30%",
    width: "95%",
    borderRadius: 15,
  },
  titleShow: {
    fontSize: 30,
    color: "#8F9207",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  addShow: {
    marginTop: 50,
    height: 150,
    width: 150,
  },
  currentDate: {
    marginTop: 10,
    fontSize: 20,
  },
  titleTimeAndArtist: {
    alignSelf: "flex-start",
    margin: 20,
    fontSize: 18,
    color: "#047396",
  },
  popupContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "90%", // Set the height to 80% of the screen
    backgroundColor: "#AFB9BE",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
