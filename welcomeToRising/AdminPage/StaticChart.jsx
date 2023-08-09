import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Svg, Rect, Text as SvgText } from "react-native-svg";

const apiUrlArtist = "http://10.100.102.181:5500/api/users";

const colors = ["blue", "green"]; // Define an array of colors for each column

export default function StaticChart() {
  const [data, setData] = useState([]); // State to store the data from the API
  const [labels, setLabels] = useState(["Musician", "Comedian"]); // State to store the labels

  const chartWidth = 300;
  const chartHeight = 200;
  const barWidth = chartWidth / data.length;
  const maxValue = Math.max(...data);

  // Normalize the data to fit within the chart height
  const normalizedData = data.map((value) => (value / maxValue) * chartHeight);

  useEffect(() => {
    fetchStatisticData();
  }, []);

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

  const fetchStatisticData = async () => {
    const data = await fetchData();
    let counterMusicians = 0;
    let counterComedian = 0;
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].kindOfArtist == "Musician") counterMusicians++;
      if (data[i].kindOfArtist == "Comedian") counterComedian++;
    }
    sum = counterMusicians + counterComedian;
    counterMusicians = Math.ceil((counterMusicians / sum) * 100);
    counterComedian = Math.floor((counterComedian / sum) * 100);
    if (data) {
      setData([counterMusicians, counterComedian]);
    } else {
      console.log("Failed to fetch statistic data");
    }
  };

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={chartHeight}>
        {normalizedData.map((value, index) => (
          <React.Fragment key={index}>
            <Rect
              x={index * barWidth}
              y={chartHeight - value}
              width={barWidth}
              height={value}
              fill={colors[index]} // Use a different color for each column
            />
          </React.Fragment>
        ))}
      </Svg>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <View key={index} style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.dataText}>{data[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Add a background color for the chart container
    paddingVertical: 20, // Add some padding to the top and bottom
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Align the labels evenly
    paddingHorizontal: 30, // Add horizontal padding to the labels container
    marginTop: 10, // Add some margin at the top
  },
  labelContainer: {
    alignItems: "center",
    marginHorizontal: 10, // Add horizontal margin between labels
  },
  label: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold", // Make the labels bold
  },
  dataText: {
    marginTop: 5, // Add space between the label and data
    fontSize: 14,
    color: "gray", // Adjust the color of the data text
  },
});
