import * as React from 'react';
import { Provider as PaperProvider, BottomNavigation} from 'react-native-paper';
import {AppRegistry} from 'react-native';
import { name as appName } from './app.json';
import { MainScreen }  from "./src/screens/mainScreen";
import { ShoppingListScreen } from "./src/screens/shoppingListScreen";

function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recipes', title: 'Recetas', icon: 'notebook-outline' },
    { key: 'shopping', title: 'Compra', icon: 'basket' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    recipes: MainScreen,
    shopping: ShoppingListScreen,
  });
  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);

export default App;