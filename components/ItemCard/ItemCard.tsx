import { Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { style } from './style'

const ItemCard = (props: {name:string,image:string,price:string,select:Function}) => {
  return (
    <TouchableOpacity style={style.container} onPress={()=>props.select()}>
      <Image style={style.image} source={{uri:props.image}} resizeMode='cover'/>
    <Text style={style.text}>{`Name: ${props.name}`}</Text>
    <Text style={style.text}>{`Price: $${props.price}`}</Text>
    </TouchableOpacity>
  )
}


export default ItemCard