import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const adminScreen = () => {
  return (
    <SafeAreaView>
    <View>
      <Text>adminScreen</Text>
      <Link href={"/(profile)/profileScreen"}>Go to Profile Screen Bitch</Link>
    </View>
    </SafeAreaView>
  )
}

export default adminScreen