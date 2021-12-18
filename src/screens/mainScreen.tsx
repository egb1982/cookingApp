import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { RecipeListScreen } from "./recipeListScreen"
import { RecipeScreen } from "./recipeScreen"

const Stack = createStackNavigator()

export const MainScreen: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={RecipeListScreen}
          options={{ title: "Mis recetas" }}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
          options={({ route }) => ({
            title: (route.params as { name: string }).name
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
