import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Statics() {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetailsModalVisible, setShowDetailsModalVisible] = useState(false);
  const [selectedShowDetails, setSelectedShowDetails] = useState(null);

  // Sample show data (replace with your actual data)
  const showData = [
    {
      SelectedDate: "2023-09-10",
      StartTime: "10:00:00",
      CrowdCapacity: 50,
      Price: 25.0,
      BusinessOwnerEmail: "owner1@example.com",
      ShowDetails: "This is the details for Show 1",
    },
    {
      SelectedDate: "2023-09-15",
      StartTime: "14:00:00",
      CrowdCapacity: 30,
      Price: 30.0,
      BusinessOwnerEmail: "owner2@example.com",
      ShowDetails: "This is the details for Show 2",
    },
    // Add more show data as needed
  ];

  useEffect(() => {
    // Process the show data and build marked dates
    const markedDatesObject = {};

    showData.forEach((item) => {
      const date = item.SelectedDate;
      markedDatesObject[date] = { selected: true, selectedColor: "red" };
    });

    setMarkedDates(markedDatesObject);
  }, []);

  const onDayPress = (day) => {
    const formattedSelectedDate = day.dateString; // Format selected date as 'YYYY-MM-DD'

    // Check if the selected date has show data
    const selectedShow = showData.find(
      (item) => item.SelectedDate === formattedSelectedDate
    );

    if (selectedShow) {
      // Construct a message with all the show details
      const showDetailsMessage = `
        Date: ${selectedShow.SelectedDate}
        Start Time: ${selectedShow.StartTime}
        Crowd Capacity: ${selectedShow.CrowdCapacity}
        Price: $${selectedShow.Price.toFixed(2)}
      `;

      setSelectedShowDetails(showDetailsMessage);
      setShowDetailsModalVisible(true);
    } else {
      setShowDetailsModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar markedDates={markedDates} onDayPress={onDayPress} />

      {/* Show Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDetailsModalVisible}
        onRequestClose={() => setShowDetailsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Show Details</Text>
            <Text style={styles.modalText}>{selectedShowDetails}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowDetailsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
