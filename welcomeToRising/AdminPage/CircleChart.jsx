import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function CircleChart() {
  const [chartData, setChartData] = useState([
    { name: "Visa", value: 0, color: "rgba(0, 0, 173, 0.73)" },
    { name: "Mastercard", value: 0, color: "rgba(238, 50, 0, 0.73)" },
    { name: "AMX", value: 0, color: "rgba(134, 132, 126, 0.35)" },
  ]);

  // Assuming you have the correct URL for your backend API
  const apiUrl = "http://10.100.102.181:5500/api/creditcard";

  useEffect(() => {
    fetchCreditCards();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
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

  const fetchCreditCards = async () => {
    const data = await fetchData();
    if (data) {
      let counterVisa = 0;
      let counterMC = 0;
      let counterAE = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "visa") counterVisa++;
        if (data[i].type === "master-card") counterMC++;
        if (data[i].type === "American Express") counterAE++;
      }
      const sum = counterVisa + counterMC + counterAE;
      const percentVisa = (counterVisa / sum) * 100;
      const percentMC = (counterMC / sum) * 100;
      const percentAE = (counterAE / sum) * 100;
      setChartData([
        { ...chartData[0], value: percentVisa },
        { ...chartData[1], value: percentMC },
        { ...chartData[2], value: percentAE },
      ]);
    } else {
      console.log("Failed to fetch credit cards data");
    }
  };

  return (
    <View>
      <PieChart
        data={chartData}
        width={400}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
}
