import React, { useState, useEffect } from "react"
import { FlatList, TouchableHighlight, StyleSheet } from "react-native"
import { List, Divider, Colors } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Swipeable } from "react-native-gesture-handler"
import { ListNameModal } from "./ListNameModal"
import { FloatingButton } from "./floatingButton"
import { useSqlTransaction } from "../hooks/hooks.db"
import { List as ListType } from "./types"

//TODO: types for list

export const ListSelector = ({ navigation }): JSX.Element => {
  const [shoppingLists, setShoppingLists] = useState<ListType[]>([])

  useEffect(() => {
    useSqlTransaction(
      "CREATE TABLE IF NOT EXISTS shopList(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
      []
    ).then((_) =>
      useSqlTransaction("SELECT * FROM shopList", []).then(({ rows }) => {
        setShoppingLists(rows._array)
      })
    )
  }, [])

  const [modal, setModal] = useState({ visible: false, name: "", id: "" })

  let listRow: Array<any> = []

  const hideModal = () => {
    setModal({ visible: false, name: "", id: "" })
    listRow.map((row) => row.close())
  }

  const handleListNameChange = () => {
    if (modal.id != "") {
      const currentList = shoppingLists.find((list) => list.id === modal.id)
      if (currentList) {
        currentList.name = modal.name

        useSqlTransaction("UPDATE shopList SET name = ? WHERE id = ?", [
          currentList.name,
          currentList.id
        ]).then(() =>
          setShoppingLists([...filterById(currentList.id), currentList])
        )
      }
    } else {
      useSqlTransaction("INSERT INTO shopList (name) values (?)", [
        modal.name
      ]).then(() =>
        useSqlTransaction("SELECT * FROM shopList", []).then(({ rows }) =>
          setShoppingLists(rows._array)
        )
      )
    }
    hideModal()
  }

  const filterById = (id: string): Array<any> =>
    shoppingLists.filter((list) => list.id !== id)

  const deleteById = (id: string) => {
    useSqlTransaction(`DELETE FROM shopList WHERE id = ?;`, [id]).then(() =>
      setShoppingLists(filterById(id))
    )
  }

  const renderDeleteAction = () => {
    return (
      <List.Item
        title={""}
        style={styles.deleteSwipeList}
        right={(props) => (
          <List.Icon {...props} color={Colors.white} icon="delete" />
        )}
      />
    )
  }

  const renderEditAction = (id: string, name: string) => {
    return (
      <TouchableHighlight
        onPressOut={() => setModal({ id, name, visible: true })}
      >
        <List.Item
          title={""}
          style={styles.editSwipeList}
          left={(props) => (
            <List.Icon {...props} color={Colors.white} icon="pencil" />
          )}
        />
      </TouchableHighlight>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Divider />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => `list_${id}`}
        data={shoppingLists}
        renderItem={({ item, index }) => {
          return (
            <>
              <Swipeable
                useNativeAnimations
                renderRightActions={renderDeleteAction}
                renderLeftActions={() => renderEditAction(item.id, item.name)}
                onSwipeableRightOpen={() => deleteById(item.id)}
                overshootLeft={false}
                ref={(ref) => (listRow[index] = ref)}
              >
                <TouchableHighlight
                  onPress={() => navigation.navigate("List", item)}
                >
                  <List.Item
                    title={item.name}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        color={Colors.deepPurple500}
                        icon="basket"
                      />
                    )}
                    right={(props) => (
                      <List.Icon {...props} icon="chevron-right" />
                    )}
                    style={styles.shoppingList}
                  />
                </TouchableHighlight>
              </Swipeable>
              <Divider />
            </>
          )
        }}
      />
      <ListNameModal
        id={modal.id}
        name={modal.name}
        visible={modal.visible}
        hideModal={hideModal}
        onChangeName={(newName) =>
          setModal({ name: newName, id: modal.id, visible: modal.visible })
        }
        onAccept={handleListNameChange}
      />
      <FloatingButton
        onButtonPressed={() => setModal({ id: "", name: "", visible: true })}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "stretch",
    flex: 1
  },
  editSwipeList: {
    backgroundColor: "green",
    justifyContent: "center",
    width: 60
  },
  deleteSwipeList: {
    backgroundColor: "red",
    justifyContent: "center",
    flex: 1
  },
  shoppingList: {
    backgroundColor: "white",
    borderRadius: 5
  }
})
