import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        borderWidth:2,
        marginHorizontal:"2.5%",
        marginVertical:"1.5%",
        borderRadius:20,
        borderColor:"#629584",
        width:"95%",
        height:230,
        backgroundColor:"#387478"
    },
    text:{
        fontSize:13,
        marginStart:10,
        marginTop:5,
        fontWeight:'bold',
        // textAlign:'center',
        color:"#E2F1E7",
        textTransform:'capitalize',
    },
    image:{
       width: "100%",
       height:"80%",
       borderTopEndRadius:20,
       borderTopStartRadius:20,
    }
})