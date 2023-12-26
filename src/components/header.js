// components/Header.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // You can use any icon library of your choice

const Header = ({ title, onCartPress }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCartPress = () => {
    // Add logic to navigate to the shopping cart or show a cart modal
    console.log("Cart pressed!");
  };

  const handleSearch = () => {
    // Add logic to handle search based on the searchQuery
    console.log("Searching for:", searchQuery);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={styles.searchIconContainer}
        >
          <AntDesign name="search1" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onCartPress} style={styles.cartIconContainer}>
        <AntDesign name="shoppingcart" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#3498db",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    padding: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "white",
    height: 30,
    width: 150, // You can adjust the width based on your design
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  searchIconContainer: {
    marginLeft: 10,
  },
  cartIconContainer: {
    padding: 10,
  },
});

export default Header;
