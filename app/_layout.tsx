import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { Stack, Tabs } from "expo-router";


export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs 
        screenOptions={{
          tabBarBackground: () => (
            <BlurView
            intensity={100}
            tint={'regular'}
            style={{
              flex: 1,
              backgroundColor: '#629584',
            }}
          />
          ),
          tabBarActiveTintColor:"#243642",
          tabBarInactiveTintColor:"#629584"
        }}
      >
        <Tabs.Screen
          name="productScreen"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="cube-outline" size={size} color={color} />
              ;
            },
            tabBarLabel:"Products"

          }}
        />
         <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="add-outline" size={size} color={color} />;
            },
            tabBarLabel:"Add Products"
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
