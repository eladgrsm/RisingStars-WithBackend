import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { API_URL } from "../../variables";
import { RSContext } from "../Context/RSContextProvider";

export default function Statics() {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowDetails, setSelectedShowDetails] = useState(null);
  const { emailAfterLogin } = useContext(RSContext);
  const [showDetails, setShowDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "business/detailsShow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BusinessOwnerEmail: emailAfterLogin,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          if (data && data.length > 0) {
            setShowDetails(data);

            const markedDatesObject = {};

            data.forEach((item) => {
              const date = item.SelectedDate;
              markedDatesObject[date] = {
                selected: true,
                selectedColor: "red",
              };
            });

            setMarkedDates(markedDatesObject);
          }
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [emailAfterLogin]);

  const onDayPress = (day) => {

    const formattedSelectedDate = day.dateString; // Format selected date as 'YYYY-MM-DD'

    const showsOnSelectedDate = showDetails
      .filter((item) => item.SelectedDate === formattedSelectedDate)
      .sort((a, b) => a.StartTime.localeCompare(b.StartTime)); // Sort by start time

    if (showsOnSelectedDate.length > 0) {
      // Construct a message with all the show details
      const showDetailsMessage = showsOnSelectedDate.map((show) => (
        <View key={show.Id} style={styles.showContainer}>
          <Text>Title: {show.TitleShow}</Text>
          <Text>Date: {show.SelectedDate}</Text>
          <Text>Start Time: {show.StartTime}</Text>
          <Text>Crowd Capacity: {show.CrowdCapacity}</Text>
          <Text>Price: ${show.Price.toFixed(2)}</Text>
        </View>
      ));

      setSelectedShowDetails(showDetailsMessage);
    } else {
      setSelectedShowDetails(null);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        // Show a loading indicator while data is being fetched
        <Text>Loading...</Text>
      ) : (
        // Render the calendar and show details once data is fetched
        <>
          <Calendar markedDates={markedDates} onDayPress={onDayPress} />

          {selectedShowDetails && (
            <ScrollView style={styles.showDetails}>
              <Text style={styles.showDetailsTitle}>Show Details</Text>
              <View style={styles.showDetailsBox}>{selectedShowDetails}</View>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  showDetails: {
    padding: 20,
  },
  showDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  showDetailsBox: {
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
  },
  showContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  showDetailsText: {
    fontSize: 16,
  },
});
