import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import BusinessInfo from "./BussinesInfo";
import { API_URL } from "../../variables";

export default function BussinesOwnerList() {
  const [businessOwners, setBusinessOwners] = useState([]);

  useEffect(() => {
    fetch(API_URL + "business/getinfo")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBusinessOwners(data))
      .catch((error) => console.error("Error fetching data:", error.message));
  }, []);

  return (
    <ScrollView>
      {businessOwners.map((businessOwner) => (
        <BusinessInfo
          key={businessOwner.UserEmail}
          email={businessOwner.UserEmail}
          logo={businessOwner.UserLogo}
          businessName={businessOwner.UserBusinessName}
          city={businessOwner.UserCity}
        />
      ))}
    </ScrollView>
  );
}
