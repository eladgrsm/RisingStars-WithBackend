import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  LogBox,
  TextInput,
  Alert,
} from "react-native";
import { RSContext } from "../Context/RSContextProvider";
import { API_URL } from "../../variables";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { errormessage } from "../common/formcss";

export default function Profile({ navigation }) {
  const { emailAfterLogin } = useContext(RSContext);
  const [dataUser, setUserData] = useState([]);
  const [showImage, setShowImage] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [City, setCity] = useState("");
  const [KindOfArtist, setKindOfArtists] = useState("");
  const [showEdit, setShowEdit] = useState(true);

  useEffect(() => {
    const email = emailAfterLogin;
    console.log(email);
    async function fetchData() {
      try {
        const data = await fetchArtistDataByEmail(email);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [emailAfterLogin]);

  useEffect(() => {
    mapImageArtists();
  }, [dataUser]);

  const mapImageArtists = () => {
    if (dataUser.length > 0) {
      setShowImage(dataUser[0].Image);
      setFirstName(dataUser[0].FirstName);
      setLastName(dataUser[0].LastName);
      setCity(dataUser[0].City);
      setPhoneNumber(dataUser[0].PhoneNumber);
      setKindOfArtists(dataUser[0].KindOfArtist);
    }
  };

  const fetchArtistDataByEmail = async (email) => {
    try {
      const response = await fetch(API_URL + "/artists/getartistdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      try {
        const response = await fetch(API_URL + "/artists/getartistdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: email }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  };

  const changeData = () => {
    setShowEdit(false);
    Alert.alert(
      "In order to edit your profile,\n you must fill the password and phone number inputs"
    );
  };

  const [pickedImagePath, setPickedImagePath] = useState("");
  LogBox.ignoreAllLogs();

  const { setArtistsRegister, artistsRegister } = useContext(RSContext);

  const [isModalVisible, setModalVisible] = useState(false);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setFetchData({ ...fetchData, city: city });
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(async () => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(API_URL + "artists/getallCities");
      if (response.ok) {
        const citiesData = await response.json();
        setCities(citiesData);
      } else {
        console.error("Error fetching cities:", response.status);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
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
    email: emailAfterLogin,
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
    if (fetchData.password == "") {
      setErrormsg("You must put a password");
      return;
    }
    if (fetchData.password != fetchData.rePassword) {
      setErrormsg("Passwords Doesn`t match");
      return;
    }
    if (fetchData.phoneNumber < 7) {
      setErrormsg("Invalid phone number");
      return;
    }
    if (fetchData.firstName == "") {
      fetchData.firstName = FirstName;
    }
    if (fetchData.lastName == "") {
      fetchData.lastName = LastName;
    }
    if (fetchData.city == "") {
      fetchData.city = City;
    }
    if (fetchData.phoneNumber == "") {
      fetchData.phoneNumber = PhoneNumber;
    }
    if (fetchData.image == "") {
      fetchData.image = showImage;
    }
    if (fetchData.kindOfArtist == "") {
      fetchData.kindOfArtist = KindOfArtist;
    }
    try {
      const response = await fetch(API_URL + "artists/updateInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchData),
      });

      if (response.ok) {
        Alert.alert("Info Update");
        setFirstName(fetchData.firstName);
        setLastName(fetchData.lastName);
        setCity(fetchData.city);
        setPhoneNumber(fetchData.phoneNumber);
        setShowImage(fetchData.image);
        setKindOfArtists(fetchData.kindOfArtist);
        setShowEdit(true);
      } else {
        throw new Error("Error signing up artist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancell = () => {
    setShowEdit(true);
  };

  return (
    <View style={styles.container}>
      {showEdit ? (
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: showImage }} style={styles.image} />

          <Text style={styles.fullName}>
            {FirstName} {LastName}
          </Text>

          <View style={styles.informationContainer}>
            <Text style={styles.titleContainer}>
              <Text style={styles.titleData}>City: </Text>
              <Text>{City}</Text>
            </Text>
            <Text style={styles.titleContainer}>
              <Text style={styles.titleData}>PhoneNumber: </Text>
              <Text>{PhoneNumber}</Text>
            </Text>
            <Text style={styles.titleContainer}>
              <Text style={styles.titleData}>KindOfArtist: </Text>
              <Text>{KindOfArtist}</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={changeData}>
            <Image
              source={require("./images/EditIcon.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
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
                    placeholder={FirstName}
                  />
                  <TextInput
                    onPressIn={() => setErrormsg(null)}
                    onChangeText={(text) =>
                      setFetchData({ ...fetchData, lastName: text })
                    }
                    style={styles.inputFullName}
                    placeholder={LastName}
                  />
                </View>
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
                  placeholder={PhoneNumber.slice(2, PhoneNumber.length)}
                  style={styles.phoneInput}
                />
              </View>

              <View style={styles.emailContainer}>
                <View style={styles.containerCities}>
                  {selectedCity ? (
                    <Text>You selected: {selectedCity}</Text>
                  ) : (
                    <Text>Please select a city</Text>
                  )}
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a city..."
                    value={searchText}
                    onChangeText={handleSearchChange}
                  />
                  <Picker
                    style={styles.picker}
                    selectedValue={selectedCity}
                    onValueChange={handleCityChange}
                  >
                    <Picker.Item label="Select a city" value="" />
                    {filteredCities.map((city, index) => (
                      <Picker.Item key={index} label={city} value={city} />
                    ))}
                  </Picker>
                </View>
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
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Image
                  source={require("./images/submitBut.png")}
                  style={styles.submitIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleCancell();
                }}
              >
                <Image
                  source={require("./images/cancellBut.png")}
                  style={styles.cancellIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e9e8eb",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: "10%",
  },
  fullName: {
    fontSize: 28,
    marginTop: "5%",
    fontWeight: "bold",
    color: "#6e6b6d",
  },
  titleData: {
    fontSize: 20,
    fontWeight: "500",
  },
  informationContainer: {
    marginTop: "8%",
  },
  titleContainer: {
    marginTop: "8%",
  },
  editIcon: {
    marginTop: 90,
    height: 80,
    width: 80,
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
    marginTop: 20,
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
  containerCities: {
    flex: 1,
    padding: 20,
    borderColor: "gray",
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  picker: {
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  submitIcon: {
    height: 68,
    width: 80,
    marginRight: 40,
    marginBottom: 45,
  },
  cancellIcon: {
    height: 65,
    width: 65,
    marginRight: 40,
    marginBottom: 45,
  },
});
