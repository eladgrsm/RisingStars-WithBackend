import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  LogBox,
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import NavHeader from "../NavHeader";
import { RSContext } from "../Context/RSContextProvider";
import { Alert } from "react-native";
import { API_URL } from "../../variables";

export default function RegistrationPayment({ navigation }) {
  const [creditCardType, setCreditCardType] = useState(""); // To store the credit card type
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    type: "",
  });

  const { businessRegister, setBusinessRegister } = useContext(RSContext);

  LogBox.ignoreAllLogs();

  const handleCreditCardChange = (creditCardData) => {
    console.log("Credit card data:", creditCardData);
    if (creditCardData.valid) {
      setFormData({
        name: creditCardData.values.name,
        number: creditCardData.values.number,
        expiry: creditCardData.values.expiry,
        cvc: creditCardData.values.cvc,
        type: creditCardData.values.type,
        email: businessRegister.email,
      });

      const {
        values: { type },
      } = creditCardData;
      setCreditCardType(type);
    } else {
      setFormData({
        name: "",
        number: "",
        expiry: "",
        cvc: "",
        type: "",
      });
      setCreditCardType("");
    }
  };

  const HandleOnSubmit = async () => {
    try {
      const response = await fetch(API_URL + "creditCards/addCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        try {
          const response = await fetch(API_URL + "business/upsert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(businessRegister),
          });
          console.log(businessRegister);
          console.log("business api: " + response.ok);
          if (response.ok) {
            Alert.alert("Business and Credit Card added Successfully");
            navigation.navigate("Login");
          }
        } catch (error) {
          console.error("Error", error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
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
              onPress={() => navigation.navigate("RegistrationBussines")}
            >
              Back
            </Text>
          </TouchableOpacity>
        </NavHeader>
        <View style={styles.stepContainer}>
          <Text>
            step <Text style={{ fontWeight: "bold" }}>3</Text> of{" "}
            <Text style={{ fontWeight: "bold" }}>3</Text>
          </Text>
        </View>

        <ScrollView>
          <View style={styles.creditContainer}>
            <Text style={styles.headerText}>Credit Card Information</Text>
            <CreditCardInput
              onChange={handleCreditCardChange}
              requiresName
              requiresCVC
              allowScroll
            />

            {creditCardType !== "" && (
              <View style={styles.cardTypeContainer}>
                <Text style={styles.cardTypeText}>You are using:</Text>
                <Text style={styles.cardType}>{creditCardType}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={HandleOnSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },
  creditContainer: {
    padding: 20,
  },
  back: {
    fontSize: 24,
    padding: 15,
    color: "white",
    marginRight: 10,
  },
  stepContainer: {
    justifyContent: "flex-start",
    marginLeft: "5%",
    marginTop: "6%",
    marginBottom: "20%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardTypeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  cardTypeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardType: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 45,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
