import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import DateAvailable from "./DateAvailable";
import { RSContext } from "../Context/RSContextProvider";

export default function BusinessInfo({ email, logo, businessName, city }) {
  const { setEmailDates } = useContext(RSContext);
  const navigation = useNavigation();

  const handlePress = () => {
    setEmailDates(email);
    navigation.navigate("DateAvailable");
  };
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: logo }} style={styles.logo} />
        </View>
        <Text>
          Email: <Text>{email}</Text>
        </Text>
        <Text>
          Business Name: <Text style={styles.name}>{businessName}</Text>
        </Text>
        <Text>
          City: <Text>{city}</Text>
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    ...Platform.select({
      android: {
        elevation: 3, // Android shadow effect
      },
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 6, // iOS shadow effect
      },
    }),
  },
  imageContainer: {
    borderRadius: 10, // Adjust the radius as needed
    overflow: "hidden", // Clip the image to the rounded edges
    borderWidth: 1,
    borderColor: "gray", // Border color for the image
    marginBottom: 15,
  },
  logo: {
    width: "100%",
    height: 245,
    resizeMode: "cover", // Use "cover" to maintain aspect ratio
  },
  name: {
    color: "blue",
    fontSize: 16,
  },
});
