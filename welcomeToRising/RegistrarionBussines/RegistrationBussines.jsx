import React, { useState, useContext } from "react";
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
  Alert,
  LogBox,
} from "react-native";
import NavHeader from "../NavHeader";
import { TextInput } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { errormessage } from "../common/formcss";
import { RSContext } from "../Context/RSContextProvider";
import PushNotification from "../PushNotification";

export default function RegistrationBussines({ navigation }) {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const {
    setBusinessPlan,
    businessPlan,
    businessRegister,
    setBusinessRegister,
  } = useContext(RSContext);
  const [errormsg, setErrormsg] = useState(null);
  LogBox.ignoreAllLogs();

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

  const kind = [
    { key: 1, value: "Musician" },
    { key: 2, value: "Comedian" },
  ];

  const castingTypeArtist = (value) => {
    if (value == 1) {
      setFetchData({ ...fetchData, kindOfArtistToShow: "Musician" });
    } else {
      setFetchData({ ...fetchData, kindOfArtistToShow: "Comedian" });
    }
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      setFetchData({ ...fetchData, logo: result.uri });
    }
  };

  const [fetchData, setFetchData] = useState({
    planBusiness: businessPlan,
    businessName: "",
    city: "",
    phoneNumber: "",
    email: "",
    password: "",
    rePassword: "",
    kindOfArtistToShow: "",
    logo: "",
  });

  const handleSubmit = async () => {
    if (
      fetchData.businessName == "" ||
      fetchData.city == "" ||
      fetchData.phoneNumber == "" ||
      fetchData.email == "" ||
      fetchData.password == "" ||
      fetchData.rePassword == "" ||
      fetchData.kindOfArtistToShow == "" ||
      fetchData.logo == ""
    ) {
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
      setBusinessRegister(fetchData);
      navigation.navigate("RegistrationPayment");
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
              onPress={() => navigation.navigate("RegistrationPlanBussines")}
            >
              Back
            </Text>
          </TouchableOpacity>
        </NavHeader>

        {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
        <View style={styles.stepContainer}>
          <Text>
            step <Text style={{ fontWeight: "bold" }}>2</Text> of{" "}
            <Text style={{ fontWeight: "bold" }}>3</Text>
          </Text>
        </View>

        <ScrollView style={{ height: "68%" }}>
          <Text style={styles.email}>Business Name:</Text>

          <View style={{ alignItems: "center" }}>
            <View style={styles.emailContainer}>
              <TextInput
                onPressIn={() => setErrormsg(null)}
                onChangeText={(text) =>
                  setFetchData({ ...fetchData, businessName: text })
                }
                placeholder="example"
                style={styles.emailInput}
              />
            </View>
          </View>

          <Text style={styles.email}>City:</Text>

          <View style={{ alignItems: "center" }}>
            <View style={styles.emailContainer}>
              <TextInput
                onPressIn={() => setErrormsg(null)}
                onChangeText={(text) =>
                  setFetchData({ ...fetchData, city: text })
                }
                placeholder="Netanya,Tel Aviv, etc..."
                style={styles.emailInput}
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
              placeholder="1234567"
              style={styles.phoneInput}
            />
          </View>

          <Text style={styles.email}>Email:</Text>

          <View style={{ alignItems: "center" }}>
            <View style={styles.emailContainer}>
              <TextInput
                onPressIn={() => setErrormsg(null)}
                onChangeText={(text) =>
                  setFetchData({ ...fetchData, email: text })
                }
                placeholder="example@gmail.com"
                style={styles.emailInput}
              />
            </View>
          </View>

          <Text style={styles.email}>Password:</Text>

          <View style={{ alignItems: "center" }}>
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="***********"
                style={styles.emailInput}
                secureTextEntry={true}
                onPressIn={() => setErrormsg(null)}
                onChangeText={(text) =>
                  setFetchData({ ...fetchData, password: text })
                }
              />
            </View>
          </View>

          <Text style={styles.email}>Re-Password:</Text>

          <View style={{ alignItems: "center" }}>
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="***********"
                style={styles.emailInput}
                secureTextEntry={true}
                onPressIn={() => setErrormsg(null)}
                onChangeText={(text) =>
                  setFetchData({ ...fetchData, rePassword: text })
                }
              />
            </View>
          </View>

          <Text style={{ marginLeft: "14%", marginTop: "8%" }}>
            Type of artist show:
          </Text>
          <View style={styles.phoneNumberContainer}>
            <View style={styles.selectListContainer}>
              <SelectList
                setSelected={(val) => castingTypeArtist(val)}
                data={kind}
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
            <TouchableOpacity onPress={showImagePicker}>
              <View style={styles.ImageFromGallery}>
                <Text>Select An Image</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={[styles.nextContainer, { backgroundColor: "green" }]}>
          <Button
            title="Next"
            color="white"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },
  back: {
    fontSize: 24,
    padding: 15,
    color: "white",
    marginRight: 10,
  },
  stepContainer: {
    justifyContent: "flex-start",
    marginLeft: "15%",
    marginTop: "6%",
    marginBottom: "5%",
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
  email: {
    marginTop: "5%",
    marginBottom: 15,
    alignItems: "center",
    marginLeft: "15%",
    fontSize: 16,
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
    marginLeft: "8%",
    marginTop: "4%",
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
  selectListContainer: {
    width: 150,
    padding: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  nextContainer: {
    alignItems: "center",
    width: "25%",
    height: "6%",
    borderRadius: 5,
    marginLeft: "60%",
    marginTop: "5%",
    alignItems: "center",
    paddingTop: "1%",
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
