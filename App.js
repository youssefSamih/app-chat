import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import axios from "axios";

const Stack = createNativeStackNavigator();

import HomeScreen from "./pages/HomeScreen";
import LogInScreen from "./pages/LogInScreen";
import RegisterScreen from "./pages/RegisterScreen";

import CreateProfileScreen from "./pages/CreateProfileScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import EditProfileScreen from "./pages/EditProfileScreen";
import EditActivityScreen from "./pages/EditActivityScreen";
import ActivityScreen from "./pages/ActivityScreen";
import MemberScreen from "./pages/memberScreen";

import CreateProfileScreenStepTwo from "./pages/CreateProfileScreenStepTwo";
import CreateProfileScreenStepThree from "./pages/CreateProfileScreenStepThree";
import CreateProfileScreenStepFour from "./pages/CreateProfileScreenStepFour";
import VerificationScreen from "./pages/VerificationScreen";
import NewPasswordScreen from "./pages/NewPasswordScreen";

import BottomNav from "./Navigation/bottomTab";
import TopNav from "./Navigation/topTab";
import HeaderRight from "./components/headerRight";
import navigationInfo from "./assets/navigationInfo";
import navigationBis from "./assets/navInfoBis";
import Burger from "./components/Burger";

// IMPORT COMPONENTS
// import LogButton from './components/LogButtons';
// import Fields from './components/Fields';
// import EditBigSquare from './components/EditBigSquare';
// import TwinButton from './components/TwinButton';
// import MultilineFields from './components/MultilineFields';
// import EventButton from './components/EventButton';

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [switch1, setSwitch1] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  //Create Profile State
  const [gender, setGender] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [city, setCity] = useState(null);
  const [language, setLanguage] = useState(null);
  const [flags, setFlags] = useState(null);

  const profileState = {
    gender,
    setGender,
    accountType,
    setAccountType,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    nickName,
    setNickName,
    city,
    setCity,
    language,
    setLanguage,
  };

  const switchBtn = () => {
    if (switch1 === false) {
      setSwitch1(true);
    } else if (switch1 === true) {
      setSwitch1(false);
    }
  };

  const setToken = async (token) => {
    console.log("App.setToken = ", token);

    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  const setProfile = async (profile) => {
    if (profile) {
      await AsyncStorage.setItem("userProfile", profile);
    } else {
      await AsyncStorage.removeItem("userProfile");
    }
    setUserProfile(profile);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const receivedUserToken = await AsyncStorage.getItem("userToken");
      setUserToken(receivedUserToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fecthProfileStep = async () => {
      const getProfileStep = await AsyncStorage.getItem("userProfile");
      setUserProfile(getProfileStep);
    };
    fecthProfileStep();
  }, []);

  useEffect(() => {
    const fecthFlags = async () => {
      const response = await axios.get(
        "https://socializus.herokuapp.com/api/assets/langues"
      );
      setFlags(response.data);
    };
    fecthFlags();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken === null ? (
            <>
              <Stack.Screen name="Home">
                {(props) => <HomeScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen name="LogIn">
                {(props) => <LogInScreen {...props} setToken={setToken} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {(props) => (
                  <RegisterScreen
                    {...props}
                    setToken={setToken}
                    setProfile={setProfile}
                    setUserProfile={setUserProfile}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="createProfile">
                {() => <CreateProfileScreen />}
              </Stack.Screen>
              <Stack.Screen name="ForgotPassword">
                {() => <ForgotPasswordScreen />}
              </Stack.Screen>
              <Stack.Screen name="Verification">
                {() => <VerificationScreen />}
              </Stack.Screen>
              <Stack.Screen name="NewPassword">
                {() => <NewPasswordScreen />}
              </Stack.Screen>
            </>
          ) : userProfile !== "done" ? (
            <>
              <Stack.Screen name="Step 1" options={{ title: "Create Profile" }}>
                {(props) => (
                  <CreateProfileScreen profileState={profileState} {...props} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Step 2" options={{ title: "Create Profile" }}>
                {(props) => (
                  <CreateProfileScreenStepTwo
                    flags={flags}
                    profileState={profileState}
                    {...props}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Step 3" options={{ title: "Create Profile" }}>
                {(props) => (
                  <CreateProfileScreenStepThree
                    profileState={profileState}
                    {...props}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Step 4" options={{ title: "Create Profile" }}>
                {(props) => (
                  <CreateProfileScreenStepFour
                    profileState={profileState}
                    setProfile={setProfile}
                    userToken={userToken}
                    {...props}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Tab" options={{ headerShown: false }}>
                {() => (
                  <BottomNav
                    arg={navigationInfo}
                    setToken={setToken}
                    func={switchBtn}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Edit Profile"
                options={{
                  tabBarLabel: "Edit profile",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <EditProfileScreen flags={flags} />}
              </Stack.Screen>
              <Stack.Screen
                name="My Activities"
                options={{
                  tabBarLabel: "My Activities",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                  headerRight: () => <HeaderRight />,
                }}
              >
                {() => <TopNav arg={navigationBis} />}
              </Stack.Screen>
              <Stack.Screen
                name="Edit Activity"
                options={{
                  tabBarLabel: "Edit Activity",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <EditActivityScreen userToken={userToken} />}
              </Stack.Screen>
              <Stack.Screen
                name="Activity"
                options={{
                  tabBarLabel: "Activity",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {(props) => <ActivityScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen
                name="Member"
                options={{
                  tabBarLabel: "Profile",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {(props) => <MemberScreen {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {switch1 === true ? (
        <Burger
          func={() => {
            setSwitch1(false);
          }}
        />
      ) : (
        undefined
      )}
    </>
  );
}
