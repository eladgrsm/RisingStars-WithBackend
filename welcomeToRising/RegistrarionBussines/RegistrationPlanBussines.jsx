import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  LogBox,
} from "react-native";
import { RSContext } from "../Context/RSContextProvider";
import NavHeader from "../NavHeader";

export default function RegistrationPlanBussines({ navigation }) {
  const [monthlyTitleColor, setMonthlyTitleColor] = useState("#80BAFF");
  const [yearlyTitleColor, setYearlyTitleColor] = useState("#80BAFF");
  const [monthlyMainColor, setMonthlyMainColor] = useState("#A0C6DB");
  const [yearlyMainColor, setYearlyMainColor] = useState("#A0C6DB");
  const [avalibleButt, setAvailableButt] = useState(false);
  const [nextColorContainer, setNextColorContainer] = useState("black");
  const [monthlyTextColor, setMonthlyTextColor] = useState(false);
  const [yearlyTextColor, setYearlyTextColor] = useState(false);
  LogBox.ignoreAllLogs();

  const {setBusinessPlan,businessPlan}=useContext(RSContext)

  const HandleMonthlyTitleColor = () => {
    setBusinessPlan("monthly")
    setMonthlyTitleColor("#2087FF");
    setYearlyTitleColor("#80BAFF");
    setMonthlyMainColor("#2087FF");
    setYearlyMainColor("#A0C6DB");
    setAvailableButt(true);
    setNextColorContainer("#1DAB45");
    setMonthlyTextColor(true);
    setYearlyTextColor(false);
  };

  const HandleYearlyTitleColor = () => {
    setBusinessPlan("yearly")
    setYearlyTitleColor("#2087FF");
    setMonthlyTitleColor("#80BAFF");
    setMonthlyMainColor("#A0C6DB");
    setYearlyMainColor("#2087FF");
    setAvailableButt(true);
    setNextColorContainer("#1DAB45");
    setMonthlyTextColor(false);
    setYearlyTextColor(true);
  };

  const HandleMonthlyMainColor = () => {
    setBusinessPlan("monthly")
    setMonthlyTitleColor("#2087FF");
    setYearlyTitleColor("#80BAFF");
    setMonthlyMainColor("#2087FF");
    setYearlyMainColor("#A0C6DB");
    setAvailableButt(true);
    setNextColorContainer("#1DAB45");
    setMonthlyTextColor(true);
    setYearlyTextColor(false);
  };

  const HandleYearlyMainColor = () => {
    setBusinessPlan("yearly")
    setYearlyTitleColor("#2087FF");
    setMonthlyTitleColor("#80BAFF");
    setMonthlyMainColor("#A0C6DB");
    setYearlyMainColor("#2087FF");
    setAvailableButt(true);
    setNextColorContainer("#1DAB45");
    setMonthlyTextColor(false);
    setYearlyTextColor(true);
  };

  return (
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

      <View style={styles.MainContainer}>
        <Text>
          step <Text style={{ fontWeight: "bold" }}>1</Text> of{" "}
          <Text style={{ fontWeight: "bold" }}>3</Text>
        </Text>

        <Text style={styles.choosePlanTitle}>
          Choose the plan that’s right for you
        </Text>

        <View style={styles.planContainerTitles}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={HandleMonthlyTitleColor}
          >
            <View
              style={[
                styles.monthlyTitle,
                { backgroundColor: monthlyTitleColor },
              ]}
            >
              <Text style={{ fontSize: 28, padding: 12 }}>Monthly</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={HandleYearlyTitleColor}
          >
            <View
              style={[
                styles.yearlyTitle,
                { backgroundColor: yearlyTitleColor },
              ]}
            >
              <Text style={{ fontSize: 28, padding: 12 }}>Yearly</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.planContainerMain}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={HandleMonthlyMainColor}
          >
            <View
              style={[
                styles.monthlyMain,
                { backgroundColor: monthlyMainColor },
              ]}
            >
              <View style={{ marginLeft: 15, marginTop: 20 }}>
                <Text
                  style={[
                    styles.mainText,
                    { color: monthlyTextColor ? "white" : "black" },
                  ]}
                >
                  <View style={styles.dot}></View> Advertising
                </Text>
                <Text
                  style={[
                    styles.mainText,
                    { color: monthlyTextColor ? "white" : "black" },
                  ]}
                >
                  <View style={styles.dot}></View> Easy {"\n"} connections{" "}
                  {"\n"} with artists
                </Text>
                <Text
                  style={[
                    styles.mainText,
                    { color: monthlyTextColor ? "white" : "black" },
                  ]}
                >
                  <View style={styles.dot}></View> Organized gigs {"\n"} calendar
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={HandleYearlyMainColor}>
            <View
              style={[styles.yearlyMain, { backgroundColor: yearlyMainColor }]}
            >
              <View style={{ marginLeft: 15, marginTop: 20 }}>
                <Text
                  style={[
                    styles.mainText,
                    { color: yearlyTextColor ? "white" : "black" },
                  ]}
                >
                  <View style={styles.dot}></View> Appear {"\n"} on welcome{" "}
                  {"\n"} screen artist
                </Text>
                <Text
                  style={[
                    styles.mainText,
                    { color: yearlyTextColor ? "white" : "black" },
                  ]}
                >
                  <View style={styles.dot}></View> Advertising
                </Text>
                <Text
                  style={[
                    styles.mainText,
                    { color: yearlyTextColor ? "white" : "black" },
                  ]}
                >
                  <View style={styles.dot}></View> Easy {"\n"} connections{" "}
                  {"\n"} with artists
                </Text>
                <Text
                  style={[
                    styles.mainText,
                    { color: yearlyTextColor ? "white" : "black" },
                  ]}
                >
                  <View style={styles.dot}></View> Organized gigs {"\n"} calendar
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.planContainerPrice}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={[
                styles.priceText,
                { color: monthlyTextColor ? "#2087FF" : "black" },
              ]}
              onPress={HandleMonthlyMainColor}
            >
              59.90₪/mo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Text
              onPress={HandleYearlyMainColor}
              style={{ color: yearlyTextColor ? "#2087FF" : "black" }}
            >
              599.90₪/year
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.planContainerPrice}>
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>

      <View
        style={[styles.nextContainer, { backgroundColor: nextColorContainer }]}
      >
        <Button         
          title="Next"
          disabled={!avalibleButt}
          color={avalibleButt ? "black" : "white"}
          onPress={() => navigation.navigate("RegistrationBussines")}
        />
      </View>
    </View>
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
    marginRight: "0%",
  },
  MainContainer: {
    justifyContent: "flex-start",
    marginLeft: "15%",
    marginTop: "10%",
  },
  choosePlanTitle: {
    fontSize: 42,
    marginTop: "5%",
  },
  planContainerTitles: {
    flexDirection: "row",
    marginTop: "20%",
  },
  monthlyTitle: {
    height: 58,
    width: 134,
    alignItems: "center",
    marginRight: "8%",
  },
  yearlyTitle: {
    height: 58,
    width: 134,
    alignItems: "center",
  },
  planContainerMain: {
    flexDirection: "row",
    marginTop: "4%",
  },
  monthlyMain: {
    height: 227,
    width: 134,
    marginRight: "8%",
  },
  yearlyMain: {
    height: 227,
    width: 134,
  },
  planContainerPrice: {
    alignItems: "center",
    marginTop: "5%",
    flexDirection: "row",
  },
  priceText: {
    marginRight: "20%",
    marginLeft: "15%",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: 134,
    marginTop: "-4%",
    marginRight: "9%",
    marginLeft: "-0.7%",
  },
  nextContainer: {
    alignItems: "center",
    width: "25%",
    height: "6%",
    borderRadius: 5,
    marginLeft: "60%",
    marginTop: "11%",
    alignItems: "center",
    paddingTop: "1%",
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: "black",
    borderRadius: 5,
  },
  mainText: {
    marginBottom: "12%",
  },
});
