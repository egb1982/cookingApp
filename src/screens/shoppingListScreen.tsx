import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { ShoppingList } from "../components/shoppingList/shoppingList"
import { ListSelector } from "../components/shoppingList/ListSelector"

const Stack = createStackNavigator()

export const ShoppingListScreen: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ShoppingLists"
          component={ListSelector}
          options={{ title: "Mis listas" }}
        />
        <Stack.Screen
          name="List"
          component={ShoppingList}
          options={({ route }) => ({
            title: (route?.params as { name: string }).name
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
