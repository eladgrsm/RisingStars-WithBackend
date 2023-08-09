import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  LogBox,
} from "react-native";
import NavHeader from "./NavHeader";

export default function WelcomeScreen({ navigation }) {
  LogBox.ignoreAllLogs();

  const [bussinesImages, setBussinesImages] = useState([
    { id: "1", source: require("../assets/templeBarLogo.png") },
    { id: "2", source: require("../assets/laganskiLogo.jpg") },
    { id: "3", source: require("../assets/mikesPlaceLogo.png") },
    { id: "4", source: require("../assets/comedyBarLogo.webp") },
  ]);

  return (
    <View style={styles.container}>
      <NavHeader>
        <Image
          style={styles.logo}
          source={require("../assets/RisingStarsLogo.png")}
        />
        <TouchableOpacity>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </TouchableOpacity>
      </NavHeader>

      <View style={styles.descContainer}>
        <Text style={styles.textDesc}>
          This app will allow musicians to easily find and book gigs, as well as
          manage all aspects of their gigs, such as scheduling, payment and
          logistics. The app can include features such as a show calendar, the
          ability to create and send contracts, and tools to manage and promote
          shows.
        </Text>
      </View>

      <View style={styles.line} />

      <View style={styles.textDecBuss}>
        <Text style={styles.textBussines}>
          {"Bussines you can \nbe part of:"}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.flatListCss}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={bussinesImages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.shadow}>
                <Image source={item.source} style={styles.image}></Image>
              </View>
            )}
          />
        </View>
        <View style={{ height: 100, alignItems: "center" }}>
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("RegistrationArtists")}
        >
          <View style={styles.artistSignUpButton}>
            <Text style={styles.textSignUp}>
              Lets start Your career ! by signUp
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("RegistrationPlanBussines")}
        >
          <View style={styles.bussinesSignUpButton}>
            <Text style={styles.textSignUp}>
              BussinesOwner? Add your bussines !
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  logo: {
    marginRight: "55%",
  },
  imageContainer: {
    flex: 1,
  },
  flatListCss: {
    height: 230,
  },
  login: {
    fontSize: 24,
    padding: 15,
    color: "white",
    marginRight: "1%",
  },
  descContainer: {
    display: "flex",
    height: 199,
    width: 342,
    backgroundColor: "#9255A8",
    borderRadius: 15,
    marginTop: "10%",
  },
  textDesc: {
    padding: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "90%",
    marginTop: "10%",
  },
  textDecBuss: {
    marginTop: "8%",
    textAlign: "left",
    marginRight: "53%",
  },
  textBussines: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 25,
  },
  artistSignUpButton: {
    marginTop: "-7%",
    height: 54,
    width: 150,
    backgroundColor: "#1DABAB",
    marginLeft: 29,
    borderRadius: 10,
  },
  bussinesSignUpButton: {
    marginTop: "-7%",
    height: 54,
    width: 150,
    backgroundColor: "#1DAB45",
    marginLeft: "57%",
    borderRadius: 10,
  },
  textSignUp: {
    padding: 10,
  },
});
