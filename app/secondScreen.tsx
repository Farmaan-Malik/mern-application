import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '@/assets/style/globalStyles'

const secondScreen = () => {
  return (
    <SafeAreaView style={[globalStyles.defaults]}>
    <View>
      <Text>secondScreen</Text>
    </View>
    </SafeAreaView>
  )
}

export default secondScreen

const styles = StyleSheet.create({})