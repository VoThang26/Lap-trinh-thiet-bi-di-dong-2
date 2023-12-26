import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.Footer}>
      <Text>Hello footer</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Footer: {
    width: "100%",
    backgroundColor: "#3498db",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
