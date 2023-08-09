import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import ArrowComponent from "./ArrowComponent";

const WeeklyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dataForDates = {
    "2023-08-09": "\nLagansky Netanya at 21:00pm",
    "2023-08-10": "\nRythem Netanya at 19:00pm",
    // Add more data entries as needed
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarFrame}>
        <Calendar
          // Specify initial date
          current={"2023-08-09"}
          // Minimum and maximum date range
          minDate={"2023-01-01"}
          maxDate={"2023-12-31"}
          // Define custom styles for specific date components
          markingType={"multi-dot"}
          markedDates={{
            "2023-08-09": {
              dots: [
                { key: "green", color: "green" },
                { key: "red", color: "red" },
              ],
              selected: true, // This indicates the selected date
            },
            "2023-08-10": {
              dots: [{ key: "red", color: "red" }],
            },
          }}
          // Function to handle when a date is pressed
          onDayPress={handleDayPress}
          // Customize header text style
          headerStyle={{
            backgroundColor: "lightblue",
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
          // Specify the month format in the header
          monthFormat={"MMMM yyyy"}
          // Customize arrow icons
          renderArrow={(direction) => <ArrowComponent direction={direction} />}
        />
      </View>
      <View style={styles.dataContainer}>
        {selectedDate && (
          <Text style={styles.dataText}>
            Data for {selectedDate}: {dataForDates[selectedDate]}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  calendarFrame: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    margin: 10,
    overflow: "hidden", // Hide any overflow to keep a clean look
  },
  dataContainer: {
    padding: 20,
    backgroundColor: "#white",
  },
  dataText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WeeklyCalendar;
