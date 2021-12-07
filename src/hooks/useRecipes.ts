import { useEffect, useState } from "react"
import { Recipe } from "../components/types"

export const useRecipes = () => {
  const [foodList, setList] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    refreshRecipesList()
  }, [])

  const refreshRecipesList = () => {
    fetch("https://recetasserver.herokuapp.com/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        setList(data)
        setIsLoading(false)
      })
  }

  const searchRecipe = (term: string) => {
    setIsLoading(true)
    if (term === "") refreshRecipesList()
    else
      fetch(`https://recetasserver.herokuapp.com/api/recipes/search/${term}`)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false)
          setList(data)
        })
  }

  return { foodList, isLoading, searchRecipe }
}
