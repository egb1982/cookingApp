import React, { useState, useEffect } from "react"
import { FlatList, TouchableHighlight } from "react-native"
import { List, Divider, Colors } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Swipeable } from "react-native-gesture-handler"
import { ListNameModal } from "./ListNameModal"
import { FloatingButton } from "./floatingButton"
import { db } from "../database/database"
import { useNavigation } from "@react-navigation/core"
import { styles } from "./styles"
import { List as ListType } from "./types"

export const ListSelector: React.FC = () => {
  const navigation = useNavigation()

  const [shoppingLists, setShoppingLists] = useState<ListType[]>([])

  useEffect(() => {
    db.transaction(
      async (tx) => {
        await tx.executeSql(
          "CREATE TABLE IF NOT EXISTS shopList(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
        )
      },
      (err) => console.log(err),
      async () => await getShoppingLists()
    )
  }, [])

  const [modal, setModal] = useState({ visible: false, name: "", id: "" })

  let listRow: Array<any> = []

  const getShoppingLists = async () => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        "SELECT * FROM shopList",
        [],
        (_, { rows: { _array } }) => setShoppingLists(_array)
      )
    })
  }

  const hideModal = () => {
    setModal({ visible: false, name: "", id: "" })
    listRow.map((row) => row.close())
  }

  const handleListNameChange = () => {
    if (modal.id != "") {
      const currentList = shoppingLists.find((list) => list.id === modal.id)
      if (currentList) {
        currentList.name = modal.name

        db.transaction(
          async (tx) => {
            await tx.executeSql("UPDATE shopList SET name = ? WHERE id = ?", [
              currentList.name,
              currentList.id
            ])
          },
          (err) => console.log(err),
          () =>
            setShoppingLists((previousList) => [
              ...previousList.filter((l) => l.id !== currentList.id),
              currentList
            ])
        )
      }
    } else {
      db.transaction(
        async (tx) => {
          await tx.executeSql("INSERT INTO shopList (name) values (?)", [
            modal.name
          ])
        },
        (err) => console.log(err),
        async () => await getShoppingLists()
      )
    }
    hideModal()
  }

  const deleteById = (id: string) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM shopList WHERE id = ?;`, [id])
      },
      (err) => console.log(err),
      () =>
        setShoppingLists((previousList) => [
          ...previousList.filter((l) => l.id !== id)
        ])
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

  const renderEditAction: React.FC<ListType> = ({ id, name }) => {
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
                renderLeftActions={() => renderEditAction(item)}
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
