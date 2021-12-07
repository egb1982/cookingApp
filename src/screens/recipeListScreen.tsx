import { useNavigation } from "@react-navigation/core"
import React from "react"
import { RecipesList } from "../components/recipe/recipesList"
import { Recipe } from "../components/types"

export const RecipeListScreen: React.FC = () => {
  const navigation = useNavigation()
  const goToRecipe = (item: Recipe) => navigation.navigate("Recipe", item)

  return <RecipesList onGoToRecipe={goToRecipe} />
}
