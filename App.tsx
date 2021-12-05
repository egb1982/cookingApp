import * as React from "react"
import {
  Provider as PaperProvider,
  BottomNavigation,
  ActivityIndicator
} from "react-native-paper"
import { AppRegistry } from "react-native"
import { name as appName } from "./app.json"
import { MainScreen } from "./src/screens/mainScreen"
import { ShoppingListScreen } from "./src/screens/shoppingListScreen"
import { useDatabase } from "./src/hooks/hooks"
import { ListsContextProvider } from "./src/context/ListsContext"

function App() {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "recipes", title: "Recetas", icon: "notebook-outline" },
    { key: "shopping", title: "Compra", icon: "basket" }
  ])

  const renderScene = BottomNavigation.SceneMap({
    recipes: MainScreen,
    shopping: ShoppingListScreen
  })

  const isDBReady = useDatabase()

  if (isDBReady) {
    return (
      <ListsContextProvider>
        <PaperProvider>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </PaperProvider>
      </ListsContextProvider>
    )
  } else {
    return <ActivityIndicator style={{ flex: 1, alignItems: "center" }} />
  }
}

AppRegistry.registerComponent(appName, () => App)

export default App
