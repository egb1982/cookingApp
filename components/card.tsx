import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Difficulty } from './difficulty';
import { bytesToBase64 } from "../convertBase64";

const getImageUri = (imageData) =>{
    // Obtain a blob: URL for the image data.
    let arrayBufferView = new Uint8Array( imageData.data.data );
    let imageBase64 = bytesToBase64(arrayBufferView);
    return imageBase64;
}

export const Card = ({recipe}):JSX.Element => {
    return (
        <View style={styles.card}>
            <ImageBackground source={{uri:
                `data:image/png;base64,${getImageUri(recipe.image)}`
                }} style={styles.cardImage}>
                <Text style={styles.cardHeader}>{recipe.name}</Text>
                <Difficulty value={recipe.difficulty}/>
            </ImageBackground>
            <View style={styles.cardBody}>
               <Text>{recipe.category}</Text>                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        flexDirection:'column',
        backgroundColor:"rgba(200,200,200,0.3)",
        width:150,
        margin: 10,
        borderBottomRightRadius:8,
        borderBottomLeftRadius:8,
        shadowColor:'#000',
        shadowRadius:5,
        shadowOffset: {width:0, height:3},
        shadowOpacity:0.3,
    },
    cardBody: {
     padding:5,
    },
    cardHeader: {
        fontSize:25,
        color:"#fff",
        textShadowColor:'#000',
        textShadowRadius: 2,
        textShadowOffset: {width:2, height:2},
    },
    cardImage:{
        width:'100%',
        height: 150,
        justifyContent:'space-between',
        paddingBottom:3,
        paddingLeft:3,
    }
});
