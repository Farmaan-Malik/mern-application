import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="adminScreen" options={{headerShown:false}}/>
      <Stack.Screen
        name="profileScreen"
       options={{headerShown:false}}
      />
    </Stack>
  );
}
