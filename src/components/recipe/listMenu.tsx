import React from "react"
import { View, Text } from "react-native"
import {
  Button,
  RadioButton,
  Dialog,
  Portal,
  Provider
} from "react-native-paper"
import { styles } from "../styles"
import { theme } from "../../../theme"

type ListMenuProps = {
  isVisible: boolean
  shopLists: Array<any>
  checkedList: number
  onDismissDialog: () => void
  onAccept: () => void
  onCheckList: (listId: number) => void
}

export const ListMenu: React.FC<ListMenuProps> = ({
  isVisible,
  shopLists,
  checkedList,
  onDismissDialog,
  onAccept,
  onCheckList
}) => {
  return (
    <Provider theme={theme}>
      <View>
        <Portal>
          <Dialog visible={isVisible} onDismiss={onDismissDialog}>
            <Dialog.Title>Elige una lista</Dialog.Title>
            <Dialog.Content>
              {shopLists.map((list) => (
                <View
                  style={styles.radioButtonGroup}
                  key={`checkbox_${list.id}`}
                >
                  <RadioButton
                    value={list.id}
                    status={checkedList === list.id ? "checked" : "unchecked"}
                    onPress={() => onCheckList(list.id)}
                  />
                  <Text
                    onPress={() => onCheckList(list.id)}
                    style={styles.radioButtonText}
                  >
                    {list.name}
                  </Text>
                </View>
              ))}
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="contained" onPress={onAccept}>
                Aceptar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  )
}
