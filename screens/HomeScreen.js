import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";

const HomeScreen = () => {
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "1760 Molave Street, New Pandan"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  const services = [
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "Shorts",
      quantity: 0,
      price: 10.15,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "Dress",
      quantity: 0,
      price: 40.25,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 7.25,
    },
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "Polo Shirt",
      quantity: 0,
      price: 15.75,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "Jeans",
      quantity: 0,
      price: 12.5,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 22.25,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 7.75,
    },
  ];

  return (
    <ScrollView style={{ flex: 1, marginTop: 20 }}>
      {/* location and profile */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{ marginLeft: "auto", marginRight: 7 }}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/320100311_1405815266617048_55131045237012181_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHDJP_D66e5hr5iVhDeha3a_R5iewnMu3P9HmJ7Ccy7c3rtlt0-CGu5g1_2R7oytdMebfqqXjxrbTLpYNb4_l0-&_nc_ohc=BEEnlia8JDUAX9_SjQ4&_nc_ht=scontent.fdvo2-2.fna&oh=00_AfAYW-Z8tNvu3Bv9Fs_uoPUNvNhhfnzBmFPXxQt8YFAe4Q&oe=64850DD8",
            }}
          />
        </Pressable>
      </View>

      {/* search bar */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for items or more" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>

      {/* carousel */}
      <Carousel />

      {/* services */}
      <Services />

      {/* render items */}
      {services.map((item, index) => (
        <DressItem item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({});
