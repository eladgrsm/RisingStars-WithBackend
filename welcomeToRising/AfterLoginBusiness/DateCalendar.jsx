import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API_URL } from "../../variables";
import { RSContext } from "../Context/RSContextProvider";
import { errormessage } from "../common/formcss";
import { useNavigation } from "@react-navigation/native";

export default function DateCalendar() {
  const navigation = useNavigation();
  const [crowdCapacity, setCrowdCapacity] = useState("");
  const [priceShow, setPriceShow] = useState("");
  const [titleShow, setTitleShow] = useState("");
  const [description, setDescription] = useState("");

  const [errormsg, setErrormsg] = useState(null);

  const { emailAfterLogin } = useContext(RSContext);

  const [showForm, setShowForm] = useState({
    SelectedDate: "",
    StartTime: "",
    CrowdCapacity: "",
    Price: "",
    BusinessOwnerEmail: emailAfterLogin,
  });

  const HandleSubmitAddShow = async () => {
    const timestamp = selectedTimeStart;
    const date = new Date(timestamp);

    // Extract the hour, minute, and second
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;

    const updatedShowForm = {
      ...showForm,
      SelectedDate: selectedStartDate,
      StartTime: timeString,
      CrowdCapacity: crowdCapacity,
      Price: priceShow,
      TitleShow: titleShow,
      Description: description,
    };

    console.log(updatedShowForm.CrowdCapacity);
    console.log(updatedShowForm.TitleShow);

    if (
      updatedShowForm.SelectedDate == "1900/01/01" ||
      updatedShowForm.CrowdCapacity == "" ||
      updatedShowForm.TitleShow == ""
    ) {
      console.log("Not send the details");
      setErrormsg("all fields are requird/ something went wrong");
      return;
    } else {
      try {
        const response = await fetch(API_URL + "business/addShow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedShowForm),
        });
        console.log("Send the all details to sql");
        navigation.navigate("Upcoming");
        
      } catch (error) {
        setErrormsg("all fields are requird/ something went wrong");
      }
    }
  };

  //Time Picker
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  // Time picker functions
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTimeStart, setSelectedTimeStart] = useState(null);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log(time);
    time.setSeconds(0);
    setSelectedTimeStart(time);
    hideTimePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
        <ScrollView>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{ width: "95%", paddingHorizontal: 22, marginTop: 64 }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>Select Date:</Text>
                <TouchableOpacity
                  style={styles.inputBtn}
                  onPress={handleOnPressStartDate}
                >
                  <Text>{selectedStartDate}</Text>
                </TouchableOpacity>

                <Text style={styles.startTime}>From Time:</Text>
                <View>
                  <TouchableOpacity onPress={showTimePicker}>
                    {selectedTimeStart != null ? (
                      <View style={styles.TimeSelectContainer}>
                        <Text>{selectedTimeStart.toLocaleTimeString()}</Text>
                      </View>
                    ) : (
                      <View style={styles.TimeSelectContainer}>
                        <Text>Select Time</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideTimePicker}
                    textColor="blue"
                  />
                </View>

                <View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.titleShowAndDescription}>
                      Title Of Show:
                    </Text>
                  </View>

                  <View style={styles.detailsContainer}>
                    <TextInput
                      onChangeText={(val) => setTitleShow(val)}
                      style={styles.inputTitle}
                    />
                  </View>

                  <View style={styles.detailsContainer}>
                    <Text style={styles.crowd}>Crowd:</Text>
                    <Text style={styles.priceDetail}>Price:</Text>
                  </View>

                  <View style={styles.detailsContainer}>
                    <TextInput
                      onChangeText={(val) => setCrowdCapacity(val)}
                      style={styles.inputDetails}
                      maxLength={4}
                    />
                    <TextInput
                      onChangeText={(val) => setPriceShow(val)}
                      style={styles.inputDetails}
                      maxLength={5}
                    />
                  </View>

                  <View style={styles.detailsContainer}>
                    <Text style={styles.titleShowAndDescription}>
                      Description:
                    </Text>
                  </View>

                  <View style={styles.detailsContainer}>
                    <TextInput
                      onChangeText={(val) => setDescription(val)}
                      style={styles.inputTitle}
                    />
                  </View>

                  <View style={styles.greenSubmitContainer}>
                    <TouchableOpacity onPress={HandleSubmitAddShow}>
                      <Image
                        source={require("./images/greenSubmit.png")}
                        style={styles.addShow}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Create modal for date picker */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={openStartDatePicker}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    mode="calendar"
                    minimumDate={startDate}
                    selected={startedDate}
                    onDateChanged={handleChangeStartDate}
                    onSelectedChange={(date) => setSelectedStartDate(date)}
                    options={{
                      backgroundColor: "#080516",
                      textHeaderColor: "#469ab6",
                      textDefaultColor: "#FFFFFF",
                      selectedTextColor: "#FFF",
                      mainColor: "#469ab6",
                      textSecondaryColor: "#FFFFFF",
                      borderColor: "rgba(122, 146, 165, 0.1)",
                    }}
                  />

                  <TouchableOpacity onPress={handleOnPressStartDate}>
                    <Text style={{ color: "white" }}>Close</Text>
                  </TouchableOpacity>

                  {console.log(selectedStartDate)}
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  startTime: {
    marginTop: 25,
    fontSize: 18,
  },
  TimeSelectContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
    alignItems: "center",
    backgroundColor: "#FFBEBE",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  priceDetail: {
    marginTop: 40,
    fontSize: 18,
    marginLeft: 120,
  },
  crowd: {
    marginTop: 40,
    fontSize: 18,
  },
  titleShowAndDescription: {
    marginTop: 25,
    fontSize: 18,
  },
  inputDetails: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#222",
    width: 150,
    height: 50,
    marginLeft: 20,
    marginRight: 12,
    marginTop: 15,
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  inputTitle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#222",
    width: 340,
    height: 50,
    marginLeft: 20,
    marginRight: 12,
    marginTop: 15,
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  addShow: {
    marginTop: 50,
    height: 100,
    width: 100,
  },
  greenSubmitContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
