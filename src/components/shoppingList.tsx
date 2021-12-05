import { RouteProp, useNavigation } from "@react-navigation/core"
import React, { useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { List, Button, TextInput } from "react-native-paper"
import { Article } from "./article"
import { useListItems } from "../hooks/useListItems"

type ShoppingListProps = {
  route: RouteProp<{ params: { id: number } }, "params">
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ route }) => {
  const navigation = useNavigation()
  const listId = route.params.id
  const {
    listArticles,
    createListItem,
    changeItemCheck,
    deleteListItem,
    cleanAllChecked
  } = useListItems(listId)

  const [newArticle, setNewArticle] = useState("")

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon="delete-sweep" onPress={cleanCheckedArticles}>
          limpiar
        </Button>
      )
    })
  }, [navigation])

  const cleanCheckedArticles = () => {
    cleanAllChecked(listId)
  }

  const handleNewArticle = () => {
    createListItem(newArticle, listId)
    setNewArticle("")
  }

  const handleCheckArticle = (id: number, value: number) => {
    changeItemCheck(value, id, listId)
  }

  const handleDeleteArticle = (id: number) => {
    deleteListItem(id, listId)
  }

  let textInput: any = null

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <List.Section>
          {listArticles
            ? listArticles
                .filter((element) => !element.checked)
                .map((item) => (
                  <Article
                    key={`${item.id}`}
                    item={item}
                    onPressCheckbox={(id, value) =>
                      handleCheckArticle(id, +value)
                    }
                    onSwipeDelete={(id) => handleDeleteArticle(id)}
                  />
                ))
            : null}
        </List.Section>
        <TextInput
          value={newArticle}
          onChangeText={(text) => setNewArticle(text)}
          onEndEditing={() => handleNewArticle()}
          placeholder="Nuevo artículo"
          ref={(ref) => {
            textInput = ref
          }}
          right={
            <TextInput.Icon name="close" onPress={() => textInput.clear()} />
          }
        />
        <List.Section>
          {listArticles
            ? listArticles
                .filter((element) => element.checked)
                .map((item) => (
                  <Article
                    key={`${item.id}`}
                    item={item}
                    onPressCheckbox={(id, value) =>
                      handleCheckArticle(id, +value)
                    }
                    onSwipeDelete={(id) => handleDeleteArticle(id)}
                  />
                ))
            : null}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "stretch",
    flex: 1
  }
})
