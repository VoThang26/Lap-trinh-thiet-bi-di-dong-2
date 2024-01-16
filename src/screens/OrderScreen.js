import { Text, View, ScrollView } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/orderContext";
import { auth } from "../../firebase";
import AuthContext from "../features/authContext";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchAllOrders = async () => {
    const res = await getAllOrderItems();
    if (res.success === true) {
      setOrders(res.data);
      console.log("res.data", res.data);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", padding: 5, backgroundColor: "white" }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>My Orders</Text>
      </View>
      {isLoggedIn ? (
        <ScrollView
          style={{ marginTop: 4, paddingTop: 4 }}
          showsVerticalScrollIndicator={false}
        >
          {orders?.map((order) => (
            <OrderItem
              key={order.orderId}
              brand={order.brand}
              qty={order.qty}
              title={order.title}
              date={order.date}
              orderId={order.orderId}
              image={order.image}
              price={order.price}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Login to view your Orders!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;
