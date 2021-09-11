import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button, RadioButton, Dialog, Portal, Provider } from 'react-native-paper'

type ListMenuProps = {
    isVisible:boolean;
    shopLists:Array<any>;
    checkedList:number;
    onDismissDialog: () => void;
    onAccept: () => void;
    onCheckList: (listId:number) => void;
}

export const ListMenu = ({
  isVisible, 
  shopLists,
  checkedList,
  onDismissDialog, 
  onAccept,
  onCheckList,
  
}:ListMenuProps):JSX.Element => {

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={isVisible} onDismiss={onDismissDialog} >
            <Dialog.Title>Elige una lista</Dialog.Title>
            <Dialog.Content>
              {
                  shopLists.map((list) => <View style={styles.radioButtonGroup} key={`checkbox_${list.id}`}  >
                      <RadioButton 
                          value={list.id}
                          status={ checkedList === list.id ? 'checked' : 'unchecked' }
                          onPress={() => onCheckList(list.id)}
                      />
                      <Text onPress={() => onCheckList(list.id)} style={styles.radioButtonText}>{list.name}</Text>
                    </View>
                  )
              }
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode='contained' onPress={()=> onAccept()}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  radioButtonGroup:{
    flexDirection:'row',
    padding:5,
  },
  radioButtonText: {
    alignSelf:'center',
    paddingVertical:10,
    fontWeight:'bold',
  }

})