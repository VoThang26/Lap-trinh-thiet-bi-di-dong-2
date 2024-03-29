import { StyleSheet, Text, View, Pressable, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import CartContext from "../features/cartContext";
import { addToOrders } from "../features/firebase/order";
import OrderContext from "../features/orderContext";

const TotalSummaryCard = ({ totalPrice }) => {
  const { setCartItems } = useContext(CartContext);
  const { setOrderItems } = useContext(OrderContext);

  const placeOrder = async () => {
    try {
      const res = await addToOrders();

      if (res.success === true) {
        ToastAndroid.show("Order placed successfully!!!", ToastAndroid.BOTTOM);
        setCartItems([]);
        setOrderItems(res.data);
      } else {
        ToastAndroid.show("Failed to place order", ToastAndroid.BOTTOM);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      ToastAndroid.show(
        "An error occurred while placing the order",
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <View style={{ border: "1px solid #ccc", borderRadius: 8, padding: 6 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Total Price:</Text>
        <Text style={{ fontWeight: "800", fontSize: 20 }}>${totalPrice}</Text>
      </View>
      <Pressable
        onPress={placeOrder}
        style={{
          backgroundColor: "black",
          paddingVertical: 16,
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        <Text
          style={{ fontWeight: "600", color: "white", textAlign: "center" }}
        >
          Place Order
        </Text>
      </Pressable>
    </View>
  );
};

export default TotalSummaryCard;

const styles = StyleSheet.create({});
