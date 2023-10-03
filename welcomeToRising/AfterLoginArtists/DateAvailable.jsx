import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Linking,
} from "react-native";
import { API_URL } from "../../variables";
import { RSContext } from "../Context/RSContextProvider";

export default function DateAvailable() {
  const { emailDates, emailAfterLogin } = useContext(RSContext);

  const [showData, setShowData] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [performanceInfo, setPerformanceInfo] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [titleShow, setTitleShow] = useState("");

  // Define the fetchShowDataByEmail function
  const fetchShowDataByEmail = async () => {
    try {
      const response = await fetch(API_URL + "business/detailsShow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ BusinessOwnerEmail: emailDates }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching show data:", error);
      throw error;
    }
  };

  // Fetch show data from the API
  useEffect(() => {
    console.log("business email: " + emailDates);
    fetchShowDataByEmail()
      .then((data) => setShowData(data))
      .catch((error) => {
        console.error("Error fetching show data:", error);
      });
  }, [emailDates]);

  const handleShowDetails = (show) => {
    setSelectedShow(show);
    console.log(show.TitleShow);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedShow(null);
    setModalVisible(false);
    setPerformanceInfo("");
    setVideoLink("");
    setSelectedDate(null); // Clear selected date when closing modal
  };

  const handleSubmit = async () => {
    try {
      // Check if all required fields are filled
      if (!performanceInfo || !videoLink || !selectedShow) {
        console.error("Please fill in all required fields");
        return;
      }

      const requestData = {
        SelectDate: selectedShow.SelectedDate,
        StartTime: selectedShow.StartTime,
        PerformanceInfo: performanceInfo,
        VideoLink: videoLink,
        BusinessOwnerEmail: emailDates, // You can access the business owner email from the context
        ArtistEmail: emailAfterLogin, // You may need to access this information from your selectedShow data
        StatusRequest: "Pending", // Set the status as "Pending" as per your requirements
        TitleShow: titleShow,
      };

      const sendEmailData = {
        ToEmail: emailDates,
        FromEmail: emailAfterLogin,
        Subject: "Send Request for show: " + titleShow,
        Body:
          "you got a request from " +
          emailAfterLogin +
          " you can see the datils on the app",
      };

      const response = await fetch(API_URL + "business/sendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle successful submission here, e.g., show a success message or update the UI
      console.log("Show request submitted successfully");

      const responseEmail = await fetch(API_URL + "business/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendEmailData),
      });

      if (!responseEmail.ok) {
        throw new Error("Network response was not ok");
      }

      if (responseEmail.ok) {
        Alert.alert("Datils sent successefully");
        console.log("Email send");
      }

      closeModal(); // Close the modal after successful submission

      // Mark the selected date as unavailable with an orange background color
      setSelectedDates([...selectedDates, selectedShow.ShowId]);

      // Show a success message
      Alert.alert(
        "Success",
        "Your show request has been submitted successfully."
      );
    } catch (error) {
      console.error("Error submitting show request:", error);
      // Handle the error, e.g., show an error message to the user

      // Show an error message
      Alert.alert(
        "Error",
        "There was an error submitting your show request. Please try again later."
      );
    }
  };

  const handleDateClick = (item) => {
    if (!selectedDates.includes(item.ShowId)) {
      setSelectedDate(item.ShowId);
      setTitleShow(item.TitleShow);
      handleShowDetails(item);
    }
  };

  return (
    <View>
      <FlatList
        data={showData}
        keyExtractor={(item) => item.ShowId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDateClick(item)}>
            <View
              style={[
                styles.dateContainer,
                selectedDate === item.ShowId && { backgroundColor: "green" },
                selectedDates.includes(item.ShowId) && {
                  backgroundColor: "orange",
                },
              ]}
            >
              <Text style={styles.dateText}>Date: {item.SelectedDate}</Text>
              <Text style={styles.titleText}>Title: {item.TitleShow}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={styles.modalBackground}
          behavior="padding"
          enabled
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Show Details</Text>
            {selectedShow && (
              <View>
                <Text>Date: {selectedShow.SelectedDate}</Text>
                <Text>Start Time: {selectedShow.StartTime}</Text>
                <Text>Crowd Capacity: {selectedShow.CrowdCapacity}</Text>
                <Text>Price: ${selectedShow.Price.toFixed(2)}</Text>
              </View>
            )}

            <Text style={styles.inputLabel}>
              Give info about your performance
            </Text>
            <TextInput
              style={styles.inputField}
              placeholder="Performance Info"
              onChangeText={(text) => setPerformanceInfo(text)}
              value={performanceInfo}
              required={true}
              multiline={true} // Enable multiline
              numberOfLines={4} // Set the number of lines to display
            />

            <Text style={styles.inputLabel}>Link for Video</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Video Link"
              onChangeText={(text) => setVideoLink(text)}
              value={videoLink}
              required={true}
            />

            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" onPress={closeModal} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    margin: 8,
  },
  dateText: {
    fontSize: 16,
  },
  titleText: {
    fontSize: 14,
    marginTop: 8,
    color: "#333333",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 18,
    marginTop: 16,
  },
  inputField: {
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
