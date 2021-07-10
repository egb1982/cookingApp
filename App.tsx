import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from "./screens/mainScreen";
import { RecipeScreen } from "./screens/recipeScreen";
import { Provider as PaperProvder} from 'react-native-paper';
import {AppRegistry} from 'react-native';
import { name as appName } from './app.json';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvder>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainScreen} options={{title:'Cooking Book'}} />
          <Stack.Screen name="Recipe" component={RecipeScreen}  options={({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvder>
  );
}

AppRegistry.registerComponent(appName, () => App);

export default App;