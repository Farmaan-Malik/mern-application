import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "@/components/ItemCard/ItemCard";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

export interface Product {
  name: string;
  price: string;
  image: string;
}

interface ProductDetails {
  name: string;
  price: string;
  image: string;
  _id: string;
}

const queryClient = new QueryClient();

export default function ProductScreen() {
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

  const updateOptions = (newData: Product) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
  };

  const updateMutation = useMutation({
    mutationFn: async (newData: Product) => {
      const api = await fetch(
        `http://localhost:8000/api/products/${id}`,
        updateOptions(newData)
      );
      return api;
    },
    onSuccess: () => {
      console.log("Success");
      dismiss();
      getProducts.mutate();
    },
    onError:()=>{
      console.log(updateMutation.error)
    }
  });

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const [productData, setProductData] = useState<ProductDetails[]>([]);
  const [selected, setSelected] = useState(false);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      console.log("calling");
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProductData(data.data);
      setIsLoading(false);
      console.log("loadingGet ", isLoading);
      return data.data;
    },
  });
  const removePlant = (id: string) => {
    return fetch(`http://localhost:8000/api/products/${id}`, {
      method: "DELETE",
    });
  };

  const deleteProducts = useMutation({
    mutationFn: () => removePlant(id as string),
    onSuccess: () => {
      console.log("Deleted");
      dismiss();
      getProducts.mutate();
    },
  });

  useFocusEffect(
    useCallback(() => {
      console.log("Hello, I am focused!");
      getProducts.mutate();

      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  );

  const dismiss = () => {
    setSelected(false);
    setId("");
    setProductImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s");
    setProductName("");
    setProductPrice("");
  };
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{height:"100%", backgroundColor: "#243642" }}>
        <View>
          {productData.length == 0 && (
            <View style={styles.indicatorContainer}>
              <Text style={[styles.submitText, {fontSize:30}]}>No Products Here</Text>
            </View>
          )}
          {isLoading && (
            <View style={styles.indicatorContainer}>
              <ActivityIndicator size={"large"} />
            </View>
          )}

          {!isLoading && (
            <FlatList
              ListHeaderComponent={
                <View style={styles.headerWrapper}>
                  <Text style={styles.header}>My Products</Text>
                  <Ionicons name="cube-outline" color={"#E2F1E7"} size={30} />
                </View>
              }
              data={productData}
              renderItem={({ item }) => (
                <ItemCard
                  select={() => {
                    setSelected(true);
                    setId(item._id);
                    setProductImage(item.image);
                    setProductName(item.name);
                    setProductPrice(item.price);
                    console.log("Item Id: ", item._id);
                  }}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                ></ItemCard>
              )}
            ></FlatList>
          )}

          <Modal
            style={{ justifyContent: "center", alignItems: "center" }}
            animationType="fade"
            transparent={true}
            visible={selected}
            onRequestClose={() => {
              dismiss();
            }}
          >
            <View style={styles.dialog}>
              <View style={styles.wrapper}>
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
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => dismiss()}
                >
                  <Ionicons color={"#E2F1E7"} name="close" size={22} />
                </TouchableOpacity>
                <View style={styles.imageWrapper}>
                  <Image
                    width={80}
                    height={80}
                    style={styles.image}
                    source={{ uri: productImage }}
                  />
                  <TouchableOpacity style={styles.upload}>
                    <Text
                      style={{ color: "#E2F1E7", fontWeight: "semibold" }}
                      onPress={() => pickImage()}
                    >
                      Upload Image
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.imageWrapper}>
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={() => {
                      const obj = {
                        name: productName,
                        price: productPrice,
                        image: productImage,
                      };
                      console.log(obj);
                      updateMutation
                        .mutateAsync(obj)
                    }}
                  >
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.submit, { backgroundColor: "#9B4444" }]}
                    onPress={() => {
                      const obj = {
                        name: productName,
                        price: `${productPrice}`,
                        image: productImage,
                      };
                      console.log(obj);
                      deleteProducts.mutate();
                    }}
                  >
                    <Text style={styles.submitText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontWeight: "semibold",
    textAlign: "center",
    fontSize: 30,
    color: "#E2F1E7",
    paddingVertical: 5,
    paddingEnd: 10,
    marginBottom: 5,
  },
  dialog: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  wrapper: {
    width: "90%",
    height: "45%",
    paddingTop: 30,
    backgroundColor: "#629584",
    borderRadius: 20,
  },
  textInput: {
    borderWidth: 2,
    width: "80%",
    height: "13%",
    marginStart: "10%",
    borderColor: "#629584",
    backgroundColor: "white",
    padding: 8,
    fontSize: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  close: {
    position: "absolute",
    right: 5,
    top: 5,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#E2F1E7",
  },
  upload: {
    width: "40%",
    height: "30%",
  },
  image: {
    width: "40%",
    borderRadius: 10,
    marginHorizontal: "5%",
  },
  imageWrapper: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    marginHorizontal: 10,
    width: "30%",
    backgroundColor: "#387478",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#629584",
  },
  submitText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#E2F1E7",
  },
});
