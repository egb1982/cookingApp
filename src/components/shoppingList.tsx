import { RouteProp, useNavigation } from "@react-navigation/core"
import React, { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { List, Button, TextInput } from "react-native-paper"
import { db } from "../database/database"
import { Article } from "./article"
import { Article as ArticleType } from "./types"

type ShoppingListProps = {
  route: RouteProp<{ params: { id: string } }, "params">
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  route
}): JSX.Element => {
  const navigation = useNavigation()
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [newArticle, setNewArticle] = React.useState("")

  const listId = route.params.id

  useEffect(() => {
    db.transaction(
      async (tx) => {
        await tx.executeSql(
          "CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, checked BOOLEAN, listId INTEGER, FOREIGN KEY (listId) REFERENCES shopList(id))"
        )
      },
      (err) => console.log(err),
      async () => await getArticles()
    )
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button icon="delete-sweep" onPress={() => cleanCheckedArticles()}>
          limpiar
        </Button>
      )
    })
  }, [navigation])

  const getArticles = async () => {
    db.transaction(
      async (tx) => {
        await tx.executeSql(
          "SELECT * FROM articles WHERE listId = ? ",
          [listId],
          (_, { rows: { _array } }) => setArticles(_array)
        )
      },
      (err) => console.error(err)
    )
  }

  const cleanCheckedArticles = async () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM articles WHERE listId = ? AND checked = ? ",
          [listId, 1]
        )
      },
      (err) => console.error(err),
      async () => {
        await getArticles()
        setArticles((prevArticles) =>
          prevArticles.filter((item) => item.checked === !!0)
        )
      }
    )
  }

  const handleNewArticle = () => {
    if (newArticle !== "") {
      db.transaction(
        async (tx) => {
          await tx.executeSql(
            "INSERT INTO articles (name, checked, listId) values (?,?,?)",
            [newArticle, 0, listId]
          )
        },
        (err) => console.error(err),
        async () => {
          setNewArticle("")
          await getArticles()
        }
      )
    }
  }

  const handleCheckArticle = (id: number, value: boolean) => {
    db.transaction(
      async (tx) => {
        await tx.executeSql("UPDATE articles SET checked = ? WHERE id = ?", [
          value,
          id
        ])
      },
      (err) => console.error(err),
      async () => await getArticles()
    )
  }

  const handleDeleteArticle = (id: number) => {
    db.transaction(
      async (tx) => {
        await tx.executeSql("DELETE FROM articles WHERE id = ?", [id])
      },
      (err) => console.error(err),
      () => setArticles(articles.filter((item) => item.id !== id))
    )
  }

  let textInput: any = null

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <List.Section>
          {articles
            ? articles
                .filter((element) => !element.checked)
                .map((item) => (
                  <Article
                    key={`${item.id}`}
                    item={item}
                    onPressCheckbox={(id, value) =>
                      handleCheckArticle(id, value)
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
          {articles
            ? articles
                .filter((element) => element.checked)
                .map((item) => (
                  <Article
                    key={`${item.id}`}
                    item={item}
                    onPressCheckbox={(id, value) =>
                      handleCheckArticle(id, value)
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
