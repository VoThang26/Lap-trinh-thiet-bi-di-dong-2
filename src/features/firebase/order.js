import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { uuidv4 } from "@firebase/util";

export const addToOrders = async () => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    const cartItems = userData.cart;
    const orderItems = [];

    cartItems.forEach((item) => {
      orderItems.push({
        orderId: uuidv4().replace(/-/g, "").substring(0, 12),
        id: item.id,
        image: item.image,
        title: item.title,
        brand: item.brand,
        price: item.price,
        qty: item.qty,
        date: new Date().toLocaleString(),
      });
    });

    await updateDoc(userDocRef, { orders: orderItems, cart: [] });
    console.log("Items added to order");
    return { success: true, data: orderItems };
  } else {
    console.error("User document does not exist");
    return { success: false, error: "User not found" };
  }
};

export const getAllOrderItems = async () => {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDocSnapshot = await getDoc(userRef);

  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();

    const orders = userData.orders || [];

    return { success: true, data: orders };
  } else {
    console.error("User document does not exist");
    return { success: false, error: "User not found" };
  }
};

// export const addToOrders = async () => {
//   const userDocRef = doc(db, "users", auth.currentUser.uid);
//   const userDocSnapshot = await getDoc(userDocRef);
//   if (userDocSnapshot.exists()) {
//     const userData = userDocSnapshot.data();
//     const cartItems = userData.cart;
//     const orderItems = orderItems || [];
//     cartItems.map((item) => {
//       orderItems.push({
//         orderId: uuidv4().replace(/-/g, "").substring(0, 12),
//         id: item.id,
//         image: item.image,
//         title: item.title,
//         brand: item.brand,
//         price: item.price,
//         qty: item.qty,
//         date: new Date().toLocaleString(),
//       });
//     });
//     await updateDoc(userDocRef, { orders: orderItems, cart: [] });
//     console.log("items added to order");
//     return { success: true, data: orderItems };
//   }
// };

// export const getAllOrderItems = async () => {
//   const userRef = doc(db, "users", auth.currentUser.uid);
//   const userDocSnapshot = await getDoc(userRef);
//   const data = userDocSnapshot.data().orders;
//   return { success: true, data };
// };
