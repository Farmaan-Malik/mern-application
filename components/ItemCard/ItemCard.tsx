import { View, Text, Image } from 'react-native'
import React from 'react'
import { style } from './style'

const ItemCard = (props: {name:string,image:string,price:string}) => {
  return (
    <View style={style.container}>
    <Image style={style.image} source={{uri:props.image}} resizeMode='cover'></Image>
    <Text style={style.text}>{`Name: ${props.name}`}</Text>
    <Text style={style.text}>{`Price: $${props.price}`}</Text>
    </View>
  )
}


export default ItemCard