import React, { useContext ,useEffect} from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { RSContext } from "../Context/RSContextProvider";

function Logout() {
  const { setShowMainArtistScreen } = useContext(RSContext);

  useEffect(() => {
    handleLogout(); // Call the function when the component mounts
  }, []);

  
  const handleLogout = () => {
    // Implement your logout logic here
    // For now, let's just set showMainArtistScreen to false
    setShowMainArtistScreen(false);
  };

  return <View>{handleLogout}</View>;
}

export default Logout;
