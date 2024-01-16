import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";

import ProductContext from "../features/productContext";
import { createProduct } from "../features/firebase/product";

const CreateProductV = ({ modalVisible, setModalVisible }) => {
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentProduct, setCurrentProduct } = useContext(ProductContext);
  const creatProduct = async () => {
    setLoading(true);
    const res = await createProduct(brand, description, image, price, title);
    if (res.success === true) {
      setCurrentProduct({ brand, description, image, price, title });
      setModalVisible(false);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (setCurrentProduct) {
    }
  }, [setCurrentProduct]);

  return (
    <View style={{ flex: 1, width: 1150, backgroundColor: "red" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable className="flex-1 justify-center items-center bg-black/[0.5]">
          <View className={`w-[80%] p-6 bg-white rounded-lg z-10`}>
            <Text className="font-bold mb-2">Brand:</Text>
            <TextInput
              className="border border-slate-300 px-3 py-2"
              value={brand}
              onChangeText={setBrand}
            />
            <Text className="font-bold mb-2">Description:</Text>
            <TextInput
              className="border border-slate-300 px-3 py-2"
              value={description}
              onChangeText={setDescription}
            />
            <Text className="font-bold mb-2">Image:</Text>
            <TextInput
              className="border border-slate-300 px-3 py-2"
              value={image}
              onChangeText={setImage}
            />
            <Text className="font-bold mb-2">Price:</Text>
            <TextInput
              className="border border-slate-300 px-3 py-2"
              value={price}
              onChangeText={setPrice}
            />
            <Text className="font-bold mb-2">Title:</Text>
            <TextInput
              className="border border-slate-300 px-3 py-2"
              value={title}
              onChangeText={setTitle}
            />
            <TouchableOpacity
              onPress={creatProduct}
              className="bg-black py-4 mt-6 rounded-lg"
            >
              <Text className="text-white font-semibold text-center">
                Create
              </Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator />}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default CreateProductV;

const styles = StyleSheet.create({});
