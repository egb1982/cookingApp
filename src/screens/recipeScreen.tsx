import { RouteProp } from "@react-navigation/core"
import React, { useState } from "react"
import { Recipe } from "../components/recipe"
import { Ingredient, Step } from "../components/types"

type RecipeScreenProps = {
  route: RouteProp<
    { params: { ingredients: Ingredient[]; steps: Step[]; name: string } },
    "params"
  >
}

export const RecipeScreen: React.FC<RecipeScreenProps> = ({
  route: {
    params: { ingredients, steps, name }
  }
}) => {
  const [ingredientsExpanded, setIngredientsExpanded] = useState(true)
  const [stepsExpanded, setStepsExpanded] = useState(true)

  return (
    <Recipe
      ingredients={ingredients}
      steps={steps}
      stepsExpanded={stepsExpanded}
      ingredientsExpanded={ingredientsExpanded}
      setIngredientsExpanded={setIngredientsExpanded}
      setStepsExpanded={setStepsExpanded}
      recipeName={name}
    />
  )
}
