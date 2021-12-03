import React, { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { List, Button, TextInput } from "react-native-paper"
import { useSqlTransaction } from "../hooks/hooks.db"
import { Article } from "./article"
import { Article as ArticleType } from "./types"

export const ShoppingList = ({ route }): JSX.Element => {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [newArticleName, setNewArticleName] = useState("")

  const listId: string = route.params.id
  let textInput: any | null = null

  useEffect(() => {
    useSqlTransaction(
      "CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, checked BOOLEAN, listId INTEGER, FOREIGN KEY (listId) REFERENCES shopList(id))",
      []
    )
      .then((_) =>
        useSqlTransaction("SELECT * FROM articles WHERE listId = ? ", [listId])
      )
      .then(({ rows }) => setArticles(rows._array))
  }, [])

  const cleanCheckedArticles = () => {
    useSqlTransaction(
      "DELETE FROM articles WHERE listId = ? AND checked = ? ",
      [listId, true]
    )
    //database stores booleans as 0 or 1
    setArticles(articles.filter((item) => item.checked == 0))
  }

  const handleNewArticle = () => {
    if (newArticleName !== "") {
      useSqlTransaction(
        "INSERT INTO articles (name, checked, listId) values (?,?,?)",
        [newArticleName, false, listId]
      )
      const temporaryId =
        Math.max.apply(
          Math,
          articles.map((o) => o.id)
        ) + 1
      setArticles([
        ...articles,
        {
          id: temporaryId,
          name: newArticleName,
          checked: false,
          listId: +listId
        }
      ])
      setNewArticleName("")
    }
  }

  const handleCheckArticle = (id: number, value: boolean) => {
    useSqlTransaction("UPDATE articles SET checked = ? WHERE id = ?", [
      value,
      id
    ])
    const updated: ArticleType = articles.find((a) => a.id === id)!
    setArticles([
      ...articles.filter((a) => a.id != id),
      { id: id, name: updated?.name, checked: value, listId: +listId }
    ])
  }

  const handleDeleteArticle = (id: number) => {
    useSqlTransaction("DELETE FROM articles WHERE id = ?", [id])
    setArticles(articles.filter((item) => item.id !== id))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        icon="delete-sweep"
        onPress={cleanCheckedArticles}
        style={styles.cleanButton}
      >
        limpiar
      </Button>
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
                    onSwipeDelete={handleDeleteArticle}
                  />
                ))
            : null}
        </List.Section>
        <TextInput
          value={newArticleName}
          onChangeText={setNewArticleName}
          onEndEditing={handleNewArticle}
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
                    onSwipeDelete={handleDeleteArticle}
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
  },
  cleanButton: {
    alignSelf: "flex-end"
  }
})
