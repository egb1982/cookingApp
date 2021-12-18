import React, { useState } from "react"
import { FlatList, TouchableHighlight } from "react-native"
import { List, Divider, Colors } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Swipeable } from "react-native-gesture-handler"
import { ListNameModal } from "./ListNameModal"
import { FloatingButton } from "./floatingButton"
import { useNavigation } from "@react-navigation/core"
import { styles } from "../styles"
import { List as ListType, ModalProps } from "../types"
import { useLists } from "../../hooks/useLists"

export const ListSelector: React.FC = () => {
  const navigation = useNavigation()
  const { lists, createListAsync, renameList, deleteList } = useLists()
  const [modal, setModal] = useState<ModalProps>({
    visible: false,
    listId: 0,
    listName: ""
  })

  let listRow: Array<any> = []

  const hideModal = () => {
    setModal({ visible: false, listId: 0, listName: "" })
    listRow.map((row) => row.close())
  }

  const handleListNameChange = () => {
    if (modal.listId !== 0) {
      const currentList = lists.find((list) => list.id === modal.listId)
      if (currentList) {
        currentList.name = modal.listName

        renameList(modal.listName, modal.listId)
      }
    } else {
      createListAsync(modal.listName)
    }
    hideModal()
  }

  const deleteById = (id: number) => {
    deleteList(id)
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
        onPressOut={() =>
          setModal({ listId: id, listName: name, visible: true })
        }
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
        data={lists}
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
                        color={Colors.green500}
                        icon="clipboard-list-outline"
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
        id={modal.listId}
        name={modal.listName}
        visible={modal.visible}
        hideModal={hideModal}
        onChangeName={(newName) =>
          setModal({
            listName: newName,
            listId: modal.listId,
            visible: modal.visible
          })
        }
        onAccept={handleListNameChange}
      />
      <FloatingButton
        onButtonPressed={() =>
          setModal({ visible: true, listId: 0, listName: "" })
        }
      />
    </SafeAreaView>
  )
}
