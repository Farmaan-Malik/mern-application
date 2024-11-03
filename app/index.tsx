import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "@/components/ItemCard/ItemCard";
import { Ionicons } from "@expo/vector-icons";

export interface Product {
  name: string;
  price: number;
  image: string;
}
const requestOptions = (newData: Product) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  };
};
const queryClient = new QueryClient();

export default function Index() {
  const [productData, setProductData] = useState<Product[]>([]);

  const getProducts = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProductData(data.data);
      console.log("please ", productData);
      return data.data;
    },
  });
  useEffect(() => {
    getProducts;
  }, []);
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

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ backgroundColor: "#243642" }}>
        <View>
          <FlatList
            ListHeaderComponent={
              <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <Text
                style={{
                  fontWeight: 'semibold',
                  textAlign: "center",
                  fontSize: 30,
                  // backgroundColor: "#387478",
                  color: "#E2F1E7",
                  // borderColor: "#629584",
                  // borderWidth: 2,
                  // width: "100%",
                  paddingVertical:5,
                  paddingEnd:10,
                  marginBottom:5,
                  // marginStart: "15%",
                }}
              >
                My Products
              </Text>
              <Ionicons name="cube-outline" color={"#E2F1E7"} size={30} />
              </View>
            }
            data={productData}
            renderItem={({ item }) => (
              <ItemCard
                name={item.name}
                price={item.price}
                image={item.image}
              ></ItemCard>
            )}
          ></FlatList>
          <Button
            title="Press"
            onPress={() =>
              mutation.mutateAsync({
                name: "Neon Tooth brush 2",
                price: 32,
                image: "popopopop",
              })
            }
          />
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
