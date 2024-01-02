import React from "react";
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
//import all the components we are going to use.
import axios from "axios";

const App = () => {
  const getDataUsingSimpleGetCall = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(function (response) {
        // handle success
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
      .finally(function () {
        // always executed
        alert("Finally called");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        Example of Axios Networking in React Native
      </Text>
      {/*Running GET Request*/}
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingSimpleGetCall}
      >
        <Text>Simple Get Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
});

export default App;
