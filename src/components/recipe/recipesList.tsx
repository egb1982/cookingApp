import React, { useState } from "react"
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { useRecipes } from "../../hooks/useRecipes"
import { Card } from "./card"
import { Search } from "./search"
import { styles } from "../styles"
import { Recipe } from "../types"

export const RecipesList = ({
  onGoToRecipe
}: {
  onGoToRecipe: (item: Recipe) => unknown
}): JSX.Element => {
  const { foodList, isLoading, searchRecipe } = useRecipes()
  const [term, setTerm] = useState("")

  const handleChangeText = (text: string) => {
    setTerm(text)
    if (text === "") searchRecipe("")
  }

  const handleSearch = () => searchRecipe(term)

  if (isLoading)
    return <ActivityIndicator style={{ flex: 1, alignItems: "center" }} />

  return (
    <SafeAreaView style={styles.containerCenter}>
      <Search
        term={term}
        onChangeSearch={handleChangeText}
        onTermSend={handleSearch}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={({ _id }) => _id}
        data={foodList}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => onGoToRecipe(item)}>
              <Card key={item._id} recipe={item} />
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}
