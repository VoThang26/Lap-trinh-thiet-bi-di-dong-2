import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "../components/OrderItem";
import { getAllOrderItems } from "../features/firebase/order";
import OrderContext from "../features/orderContext";
import AuthContext from "../features/authContext";

const OrderScreen = ({ navigation }) => {
  const { orders, setOrders } = useContext(OrderContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllOrders = async () => {
    try {
      const res = await getAllOrderItems();
      if (res.success === true) {
        setOrders(res.data);

        console.log("res.data", res.data);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllOrders();
  }, []);
  const handleRestart = () => {
    fetchAllOrders();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", padding: 5, backgroundColor: "white" }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>My Orders</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : isLoggedIn ? (
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
      {error && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={handleRestart}
        style={{ alignItems: "center", marginTop: 10 }}
      >
        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
          Restart
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderScreen;
