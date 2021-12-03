import React from "react"
import { View, Text, ImageBackground } from "react-native"
import { Difficulty } from "./difficulty"
import { bytesToBase64 } from "../convertBase64"
import { Recipe } from "./types"
import { styles } from "./styles"

//TODO: find correct type for imageData

const getImageUri = (imageData: any) => {
  // Obtain a blob: URL for the image data.
  let arrayBufferView = new Uint8Array(imageData.data.data)
  let imageBase64 = bytesToBase64(arrayBufferView)
  return imageBase64
}

export const Card: React.FC<{ recipe: Recipe }> = ({ recipe }): JSX.Element => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: `data:image/png;base64,${getImageUri(recipe.image)}` }}
        style={styles.cardImage}
      >
        <Text style={styles.cardHeader}>{recipe.name}</Text>
        <Difficulty value={recipe.difficulty} />
      </ImageBackground>
      <View style={styles.cardBody}>
        <Text numberOfLines={2} ellipsizeMode={"tail"}>
          {recipe.category}
        </Text>
      </View>
    </View>
  )
}
