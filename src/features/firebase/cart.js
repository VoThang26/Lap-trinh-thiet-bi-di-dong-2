import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export const getCartItems = async () => {
  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const data = userDocSnapshot.data().cart || [];
      return { data, success: true };
    } else {
      console.log("User document does not exist");
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return {
      success: false,
      error: "An error occurred while fetching cart items",
    };
  }
};
export const addToCart = async (itemId, qty) => {
  try {
    const productRef = doc(db, "products", itemId);
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const productSnapshot = await getDoc(productRef);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists() && productSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const productData = productSnapshot.data();
      const cartItems = userData.cart || [];

      cartItems.push({
        id: itemId,
        title: productData.title,
        brand: productData.brand,
        price: productData.price,
        image: productData.image,
        qty: qty,
      });

      await updateDoc(userDocRef, { cart: cartItems });
      console.log("Items added to cart");
      return { success: true, data: cartItems };
    } else {
      console.error("User or product doesn't exist");
      return { success: false, error: "User or product not found" };
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { success: false, error: "An error occurred" };
  }
};
export const removeItemById = async (id) => {
  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const newCart = userData.cart.filter((item) => item.id !== id);
      await updateDoc(userDocRef, { cart: newCart });
      const subTotal = newCart.reduce((acc, curr) => acc + Number(curr.price));
      return { data: newCart, success: true, subTotal };
    } else {
      console.log("User doesn't exist");
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error removing item:", error);
    return { success: false, error: "An error occurred" };
  }
};
