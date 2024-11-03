import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "@/assets/style/globalStyles";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Product } from "./productScreen";

const AddProducts = () => {
const [productName,setProductName] = useState("")
const [productPrice,setProductPrice] = useState("")
const [productImage,setProductImage] = useState("")

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
    );
    if (!api.ok) {
      throw new Error("Error has occured while making api call");
    }
    return api.json();
  },
});

const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>

    <SafeAreaView style={[globalStyles.defaults]}>
      <View style={styles.container}>
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
          onChangeText={string=>setProductName(string)}
        ></TextInput>
        <TextInput
        keyboardType='numeric'
          style={styles.textInput}
          placeholder={"Product Price"}
          placeholderTextColor={"grey"}
          value={productPrice}
          onChangeText={string=>setProductPrice(string)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder={"Product Image URI"}
          placeholderTextColor={"grey"}
          value={productImage}
          onChangeText={string=>setProductImage(string)}
        ></TextInput>
        <TouchableOpacity style={styles.submit} onPress={()=>{
          const obj = {
            name:productName,
            price:productPrice,
            image:productImage
          }
console.log(obj)
          // mutation.mutateAsync({
          //   name: "Neon Tooth brush 2",
          //   price: 32,
          //   image: "popopopop",
          // })

        }}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
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
    height:"13%",
    marginStart: "10%",
    borderColor: "#629584",
    backgroundColor: "white",
    padding: 8,
    fontSize: 15,
    marginVertical: 20,
    borderRadius:10
  },
  container: {
    marginVertical: "10%",
  },
  submit:{
    marginTop:20,
    width:"50%",
    backgroundColor:"#387478",
    height:"10%",
    marginStart:"25%",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
    borderWidth:2,
    borderColor:"#629584"
  },
  submitText:{
    fontSize:20,
    fontWeight:'bold',
    color:"#E2F1E7"
  }
});
