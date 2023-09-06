import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { RSContext } from "../Context/RSContextProvider";

function Logout() {
  const { setShowMainArtistScreen, setShowMainBusinessScreen } =
    useContext(RSContext);

  useEffect(() => {
    handleLogout(); 
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    // For now, let's just set showMainArtistScreen to false
    setShowMainArtistScreen(false);
    setShowMainBusinessScreen(false);
  };

  return <View>{handleLogout}</View>;
}

export default Logout;
