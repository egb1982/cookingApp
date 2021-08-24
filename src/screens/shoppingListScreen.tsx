import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { ShoppingList } from '../components/shoppingList';
import { ListSelector } from "../components/ListSelector";

const Stack = createStackNavigator();

export const ShoppingListScreen = ():JSX.Element => {
    return (
      <NavigationContainer independent={true}>      
          <Stack.Navigator>
            <Stack.Screen name="ShoppingLists" 
                          component={ListSelector} 
                          options={{title:'Listas de la compra'}} />
            <Stack.Screen name="List" 
                          component={ShoppingList} 
                          options={ ({route}) => ({title:route?.params?.name})} />
          </Stack.Navigator>
      </NavigationContainer>
    );
}

