import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NavHeader(props) {
  return <View style={styles.navBar}>{props.children}</View>;
}

const styles = StyleSheet.create({
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: 110,
    width: "100%",
    paddingTop: 38,
    backgroundColor: "#000D83",
  },
});
