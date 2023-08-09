import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  LogBox,
} from "react-native";
import NavHeader from "./NavHeader";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { errormessage } from "./common/formcss";
import { API_URL } from "../variables";
import { RSContext } from "./Context/RSContextProvider";

export default function Login({ navigation }) {
  LogBox.ignoreAllLogs();

  const { setShowMainArtistScreen, showMainArtistScreen } =
    useContext(RSContext);

  const [fetchInputs, setFetchInputs] = useState({
    email: "",
    password: "",
  });
  const [errormsg, setErrormsg] = useState(null);

  const handleLogin = async () => {
    if (fetchInputs.email === "" || fetchInputs.password === "") {
      setErrormsg("All fields are required");
      return;
    }

    console.log("enter to second catch");
    try {
      const response = await fetch(API_URL + "artists/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchInputs),
      });

      if (response.ok) {
        setShowMainArtistScreen(true);
        console.log(showMainArtistScreen);
        Alert.alert("Signed In Successfully");
        navigation.navigate("MainArtistScreen");
      }
    } catch (error) {
      try {
        const response = await fetch(
          "http://10.57.0.122:5500/api/business/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fetchInputs),
          }
        );

        if (response.ok) {
          Alert.alert("Signed In Successfully");
          navigation.navigate("WelcomeScreen");
        }
      } catch (error) {
        try {
          const response = await fetch(
            "http://10.57.0.122:5500/api/admin/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(fetchInputs),
            }
          );

          if (response.ok) {
            console.log("third step");
          }
        } catch (error) {
          Alert.alert("Failed to sign-in");
          console.log("Failed to sign-in");
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <NavHeader>
        <Image
          style={styles.logo}
          source={require("../assets/RisingStarsLogo.png")}
        />
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
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.loginTitle}>Login</Text>
          </View>

          <Text style={styles.email}>Enter email:</Text>

          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) =>
                setFetchInputs({ ...fetchInputs, email: text })
              }
            />
          </View>

          <Text style={styles.password}>Enter password:</Text>

          <View style={styles.emailContainer}>
            <TextInput
              style={styles.emailInput}
              secureTextEntry={true}
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) =>
                setFetchInputs({ ...fetchInputs, password: text })
              }
            />
          </View>

          <View style={styles.starContainer}>
            <Text style={styles.clickSubmit}>Click To Sumbit</Text>
            <TouchableOpacity
              onPress={() => {
                handleLogin();
              }}
            >
              <Image
                style={styles.starGold}
                source={require("../assets/Golden_star.svg.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  logo: {
    marginRight: 220,
  },
  back: {
    fontSize: 24,
    padding: 15,
    color: "white",
    marginRight: 10,
  },
  loginTitle: {
    fontSize: 68,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emailInput: {
    height: 58,
    width: 302,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
  },
  email: {
    marginTop: 80,
    marginBottom: 15,
    alignItems: "center",
    fontSize: 24,
  },
  password: {
    marginTop: 55,
    marginBottom: 15,
    alignItems: "center",
    fontSize: 24,
  },
  starGold: {
    height: 145,
    width: 150,
  },
  starContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    marginRight: 100,
  },
  clickSubmit: {
    paddingTop: 85,
  },
});
