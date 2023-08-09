import React, { createContext, useState } from "react";

export const RSContext = createContext();

export default function RSContextProvider(props) {
  const [businessPlan, setBusinessPlan] = useState("");
  const [businessRegister, setBusinessRegister] = useState({});
  const [artistsRegister, setArtistsRegister] = useState({});
  const [saveRandomNumber , setSaveRandomNumber] = useState(0)
  const [showMainArtistScreen, setShowMainArtistScreen] = useState(false);

  return (
    <RSContext.Provider
      value={{
        businessPlan,
        setBusinessPlan,
        businessRegister,
        setBusinessRegister,
        setArtistsRegister,
        artistsRegister,
        setSaveRandomNumber,
        saveRandomNumber,
        setShowMainArtistScreen,
        showMainArtistScreen
      }}
    >
      {props.children}
    </RSContext.Provider>
  );
}
