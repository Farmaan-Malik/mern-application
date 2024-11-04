import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/assets/style/globalStyles";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Product } from "./productScreen";
import { Ionicons } from "@expo/vector-icons";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s"
  );
  const [productAdded, setProductAdded] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      console.log("cancelled");
    } else {
      setProductImage(result.assets[0].uri);
      console.log(productImage);
    }
  };

  const requestOptions = (newData: Product) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
  };

  const mutation = useMutation({
    mutationFn: async (newData: Product) => {
      const api = await fetch(
        "http://localhost:8000/api/products",
        requestOptions(newData)
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });

      return api;
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setProductAdded(false);
    }, 3000);
  }, [mutation.isSuccess]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={[globalStyles.defaults]}>
        <View style={styles.container}>
          {mutation.isPending && (
            <View style={styles.indicatorContainer}>
              <ActivityIndicator size={"large"} />
            </View>
          )}
          {!mutation.isPending && !productAdded && (
            <>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 30,
                  color: "#E2F1E7",
                  paddingVertical: 5,
                  paddingEnd: 10,
                  marginBottom: 5,
                }}
              >
                Add new product
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder={"Product Name"}
                placeholderTextColor={"grey"}
                value={productName}
                onChangeText={(string) => setProductName(string)}
              ></TextInput>
              <TextInput
                keyboardType="numeric"
                style={styles.textInput}
                placeholder={"Product Price"}
                placeholderTextColor={"grey"}
                value={productPrice}
                onChangeText={(string) => setProductPrice(string)}
              ></TextInput>
              <Image
                style={styles.image}
                source={{ uri: productImage }}
                resizeMode="cover"
              />

              {/* <TextInput
                style={styles.textInput}
                placeholder={"Product Image URI"}
                placeholderTextColor={"grey"}
                value={productImage}
                onChangeText={(string) => setProductImage(string)}
              ></TextInput> */}
              <TouchableOpacity
                style={styles.uploadWrapper}
                onPress={pickImage}
              >
                <Text style={styles.uploadText}>Upload Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submit}
                onPress={() => {
                  const obj = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                  };
                  console.log(obj);
                  mutation
                    .mutateAsync(obj)
                    .then(() => {
                      setProductAdded(true);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                    .finally(() => {
                      setProductName("");
                      setProductPrice("");
                      setProductImage(
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s"
                      );
                    });
                }}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}

          <Modal
            style={{ justifyContent: "center", alignItems: "center" }}
            animationType="fade"
            transparent={true}
            visible={productAdded}
            onRequestClose={() => {}}
          >
            <View style={styles.success}>
              <View style={styles.wrapper}>
                <Text style={styles.successText}>
                  Product Added Successfully
                </Text>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={30}
                  color={"#387478"}
                />
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    width: "80%",
    height: "13%",
    marginStart: "10%",
    borderColor: "#629584",
    backgroundColor: "white",
    padding: 8,
    fontSize: 15,
    marginVertical: 20,
    borderRadius: 10,
  },
  container: {
    marginVertical: "10%",
  },
  submit: {
    marginTop: 20,
    width: "50%",
    backgroundColor: "#387478",
    height: "10%",
    marginStart: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#629584",
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E2F1E7",
  },
  indicatorContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  success: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    color: "#387478",
    fontWeight: "bold",
  },
  wrapper: {
    flexDirection: "row",
    width: "80%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#E2F1E7",
  },
  image: {
    width: "80%",
    height: "30%",
    marginStart: "10%",
    borderRadius: 20,
  },
  uploadText: {
    fontSize: 15,
    color: "#E2F1E7",
    textAlign: "center",
    fontWeight: "semibold",
  },
  uploadWrapper: {
    width: "30%",
    borderWidth: 2,
    marginStart: "60%",
    padding: 5,
    backgroundColor: "#629584",
    borderRadius: 10,
  },
});
