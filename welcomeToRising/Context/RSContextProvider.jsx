import React, { createContext, useState } from "react";

export const RSContext = createContext();

export default function RSContextProvider(props) {
  const [businessPlan, setBusinessPlan] = useState("");
  const [businessRegister, setBusinessRegister] = useState({});
  const [artistsRegister, setArtistsRegister] = useState({});
  const [saveRandomNumber, setSaveRandomNumber] = useState(0);
  const [showMainArtistScreen, setShowMainArtistScreen] = useState(false);
  const [showMainBusinessScreen, setShowMainBusinessScreen] = useState(false);
  const [emailAfterLogin, setEmailAfterLogin] = useState("");
  const [emailDates, setEmailDates] = useState("");

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
        showMainArtistScreen,
        emailAfterLogin,
        setEmailAfterLogin,
        showMainBusinessScreen,
        setShowMainBusinessScreen,
        setEmailDates,
        emailDates,
      }}
    >
      {props.children}
    </RSContext.Provider>
  );
}
