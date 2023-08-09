import React from "react";
import { Text } from "react-native";

const ArrowComponent = ({ direction }) => {
  // Your custom arrow rendering logic here
  return <Text>{direction === "left" ? "<" : ">"}</Text>;
};

export default ArrowComponent;
