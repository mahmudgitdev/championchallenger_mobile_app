import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../constants'

export default function SplashScreen() {
  return (
    <View style={{flex:1,backgroundColor:colors.lightGray,justifyContent:'center',alignItems:'center'}}>
      <Text>Champion Challenger</Text>
    </View>
  )
}