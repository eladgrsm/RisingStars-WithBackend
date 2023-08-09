import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CircleChart from "./CircleChart";
import StaticChart from "./StaticChart";
import NavHeader from "../NavHeader";
import { ScrollView } from "react-native-gesture-handler";

export default function Admin({ navigation }) {
  const apiUrlArtist = "http://localhost:5500/api/users";
  const apiUrlBusiness = "http://localhost:5500/api/business";

  const [usersCounters, setUsersCounters] = useState(0);
  const [businessCounters, setBusinessCounters] = useState(0);

  const amountOfUsers = async () => {
    const data = await fetchData();
    let length = data.length;
    setUsersCounters(length);
  };

  const amountOfBusiness = async () => {
    const data = await fetchDataBusiness();
    let length = data.length;
    setBusinessCounters(length);
  };

  useEffect(() => {
    amountOfUsers(), amountOfBusiness();
  });

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrlArtist);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchDataBusiness = async () => {
    try {
      const response = await fetch(apiUrlBusiness);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return (
    <View style={styles.stepContainer}>
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

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Registered Users and Business</Text>
          <View style={styles.statContainer}>
            <Text style={styles.statLabel}>Total Users: {usersCounters}</Text>
            <Text style={styles.statLabel}>
              Total Businesses: {businessCounters}
            </Text>
          </View>

          <Text style={styles.chartTitle}>Card type usage:</Text>
          <CircleChart />

          <Text style={styles.chartTitle}>Kind of users:</Text>
          <StaticChart />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  statContainer: {
    marginBottom: 20,
  },
  statLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  back: {
    fontSize: 24,
    padding: 15,
    color: "white",
    marginRight: 10,
  },
  stepContainer: {
    justifyContent: "flex-start",
    marginBottom: "20%",
  },
});
