import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  alert,
  Alert,
  LogBox,
  Modal,
} from "react-native";
import NavHeader from "./NavHeader";
import {
  RotationGestureHandler,
  TextInput,
} from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { errormessage } from "./common/formcss";
import { RSContext } from "./Context/RSContextProvider";
import PushNotification from "./PushNotification";

export default function RegistrationArtists({ navigation }) {
  const [pickedImagePath, setPickedImagePath] = useState("");
  LogBox.ignoreAllLogs();

  const { setArtistsRegister, artistsRegister } = useContext(RSContext);

  const [isModalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFetchData({ ...fetchData, image: result.uri });
      showAlertMessage("Picture Added Successfully");
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFetchData({ ...fetchData, image: result.uri });
      showAlertMessage("Picture Added Successfully");
    }
  };

  const showAlertMessage = (message) => {
    Alert.alert("Success", message);
  };

  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const prefixPhoneNumber = [
    { key: 1, value: "050" },
    { key: 2, value: "051" },
    { key: 3, value: "052" },
    { key: 4, value: "053" },
    { key: 5, value: "054" },
    { key: 6, value: "055" },
    { key: 7, value: "056" },
    { key: 8, value: "057" },
    { key: 9, value: "058" },
    { key: 10, value: "059" },
  ];

  const [typeOfArtist, setTypeOfArtist] = useState("");
  const kind = [
    { key: 1, value: "Musician" },
    { key: 2, value: "Comedian" },
  ];

  const [fetchData, setFetchData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    password: "",
    rePassword: "",
    kindOfArtist: "",
    image: "",
  });

  const [errormsg, setErrormsg] = useState(null);

  const castingTypeArtist = (value) => {
    if (value == 1) {
      setFetchData({ ...fetchData, kindOfArtist: "Musician" });
    } else {
      setFetchData({ ...fetchData, kindOfArtist: "Comedian" });
    }
  };

  // the handle fetching for create user
  const handleSubmit = async () => {
    if (
      fetchData.firstName == "" ||
      fetchData.lastName == "" ||
      fetchData.email == "" ||
      fetchData.phoneNumber == "" ||
      fetchData.city == "" ||
      fetchData.password == "" ||
      fetchData.rePassword == "" ||
      fetchData.kindOfArtist == "" ||
      fetchData.image == ""
    ) {
      console.log(fetchData);
      setErrormsg("All fields are required");
      return;
    } else {
      if (fetchData.password != fetchData.rePassword) {
        setErrormsg("Passwords Doesn`t match");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(fetchData.email);
      if (!isValid) {
        setErrormsg("Invalid Email");
        return;
      }
      if (fetchData.phoneNumber < 7) {
        setErrormsg("Invalid phone number");
        return;
      }
      try {
        console.log(fetchData);
        setArtistsRegister(fetchData);
        openModal();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <NavHeader>
          <TouchableOpacity>
            <Text
              style={styles.back}
              onPress={() => navigation.navigate("WelcomeScreen")}
            >
              Back
            </Text>
          </TouchableOpacity>
        </NavHeader>
        {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
        <ScrollView style={{ height: "65%" }}>
          <View style={styles.containerFullName}>
            <View style={styles.fullName}>
              <Text style={styles.firstName}>FirstName:</Text>
              <Text>LastName:</Text>
            </View>
            <View style={styles.inpusNames}>
              <TextInput
                onPressIn={() => setErrormsg(null)}
                onChangeText={(text) =>
                  setFetchData({ ...fetchData, firstName: text })
                }
                style={styles.inputFullName}
              />
              <TextInput
                onPressIn={() => setErrormsg(null)}
                onChangeText={(text) =>
                  setFetchData({ ...fetchData, lastName: text })
                }
                style={styles.inputFullName}
              />
            </View>
          </View>

          <Text style={styles.email}>Email:</Text>

          <View style={styles.emailContainer}>
            <TextInput
              placeholder="example@gmail.com"
              style={styles.emailInput}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) =>
                setFetchData({ ...fetchData, email: text })
              }
            />
          </View>

          <Text style={styles.email}>Phone Number:</Text>

          <View style={styles.phoneNumberContainer}>
            <View style={styles.selectListContainer}>
              <SelectList
                setSelected={(val) => setSelectedPhoneNumber(val)}
                data={prefixPhoneNumber}
                phone={selectedPhoneNumber}
                save="value"
                placeholder="select prefix"
                dropdownStyles={{ backgroundColor: "#D5F2E1" }}
                boxStyles={{
                  backgroundColor: "white",
                  borderColor: "#ccc",
                  borderWidth: 7,
                }}
                maxHeight={115}
              />
            </View>
            <TextInput
              maxLength={7}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) =>
                setFetchData({
                  ...fetchData,
                  phoneNumber: selectedPhoneNumber + text,
                })
              }
              placeholder="1234567"
              style={styles.phoneInput}
            />
          </View>

          <Text style={styles.email}>City:</Text>
          <View style={styles.emailContainer}>
            <TextInput
              placeholder="Netanya,Tel Aviv, etc..."
              style={styles.emailInput}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) =>
                setFetchData({ ...fetchData, city: text })
              }
            />
          </View>
          <Text style={styles.email}>Password:</Text>

          <View style={styles.emailContainer}>
            <TextInput
              maxLength={10}
              placeholder="***********"
              style={styles.emailInput}
              secureTextEntry={true}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) =>
                setFetchData({ ...fetchData, password: text })
              }
            />
          </View>
          <Text style={styles.email}>Re-password:</Text>

          <View style={styles.emailContainer}>
            <TextInput
              maxLength={10}
              placeholder="***********"
              style={styles.emailInput}
              secureTextEntry={true}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) =>
                setFetchData({ ...fetchData, rePassword: text })
              }
            />
          </View>

          <Text style={styles.email}>Kind Of artist:</Text>
          <View>
            <View style={styles.selectListContainerKind}>
              <SelectList
                setSelected={(val) => castingTypeArtist(val)}
                data={kind}
                save="Value"
                placeholder="Select from list"
                dropdownStyles={{ backgroundColor: "#D5F2E1" }}
                boxStyles={{
                  backgroundColor: "white",
                  borderColor: "#ccc",
                  borderWidth: 4,
                }}
                maxHeight={115}
              />
            </View>
          </View>

          <View style={styles.ContainerImageOpener}>
            <TouchableOpacity onPress={showImagePicker}>
              <View style={styles.ImageFromGallery}>
                <Text>Select an image</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <View style={styles.ImageFromGallery}>
                <Text>Open camera</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.starContainer}>
          <Text style={styles.clickSubmit}>Click To Sumbit</Text>
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
          >
            <Image
              style={styles.starGold}
              source={require("../assets/Golden_star.svg.png")}
            />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={closeModal}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
            <PushNotification navigation={navigation} closeModal={closeModal}/>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  scrollviewContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerFullName: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  selectListContainer: {
    width: 150,
    padding: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  selectListContainerKind: {
    width: 335,
    padding: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  phoneNumberContainer: {
    flexDirection: "row",
  },
  back: {
    fontSize: 24,
    padding: 15,
    color: "white",
    marginRight: 10,
  },
  fullName: {
    flexDirection: "row",
  },
  inputFullName: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  inpusNames: {
    flexDirection: "row",
  },
  firstName: {
    marginRight: 105,
  },
  emailInput: {
    height: 58,
    width: 335,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginLeft: 15,
    backgroundColor: "#fff",
  },
  phoneInput: {
    height: 58,
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    marginLeft: 15,
    backgroundColor: "#fff",
  },
  email: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    marginLeft: 25,
    fontSize: 16,
  },
  starGold: {
    height: 130,
    width: 115,
  },
  starContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginRight: 100,
  },
  clickSubmit: {
    paddingTop: 85,
  },
  kindArtistContainer: {
    flexDirection: "row",
  },
  ImageFromGallery: {
    height: 58,
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 18,
    marginLeft: 15,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  ContainerImageOpener: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(121, 184, 239, 1)",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 20,
    marginTop: 140,
  },
  closeModalButton: {
    position: "absolute",
    top: 35,
    right: 45,
    zIndex: 5,
  },
  closeModalText: {
    color: "red",
    fontSize: 18,
  },
});
