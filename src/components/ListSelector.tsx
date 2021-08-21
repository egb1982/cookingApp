import React, {useState, useEffect} from 'react';
import { FlatList,TouchableHighlight,StyleSheet } from "react-native";
import { List, Divider, Colors} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from "react-native-gesture-handler";
import { ListNameModal } from "./ListNameModal";
import { FloatingButton } from './floatingButton';
import { db } from '../database/database';

export const ListSelector = ({navigation}):JSX.Element => {

    const [shoppingLists,setShoppingLists] = useState([]);

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS shopList(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        tx.executeSql("SELECT * FROM shopList", [], (_, { rows:{ _array } }) => { setShoppingLists(_array); console.log(_array); });
        
        //tx.executeSql('CREATE table IF NOT EXISTS articles(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, listId INTEGER FOREIGN KEY REFERENCES shopList(id))');
      })
    },[]);

    const [modal, setModal] = useState({visible:false,name:'',id:''});          
    
    let listRow:Array<any> = [];

    const hideModal = () => { 
      setModal({visible:false,name:'',id:''}); 
      listRow.map(row => row.close());
    }

    const handleListNameChange = () => {
      if (modal.id != ''){
        const currentList = shoppingLists.find( list => list.id === modal.id );
        if (currentList) {
          currentList.name = modal.name;

          db.transaction(
            (tx) => {
              tx.executeSql("UPDATE shopList SET name = ? WHERE id = ?", [currentList.name,currentList.id]);
            },
            null,
            () => setShoppingLists([...filterById(currentList.id),currentList])
          );
        }  
      } else {
        //setShoppingLists([...shoppingLists, {_id:id.toString(), name:modal.name, articles:[]}]);

        db.transaction(
          (tx) => {
            tx.executeSql("INSERT INTO shopList (name) values (?)", [modal.name]);
            tx.executeSql("SELECT * FROM shopList", [], (_, { rows:{ _array } }) => setShoppingLists(_array));
          },
        );
      }
      hideModal();
    }
    
    const filterById = (id:string):Array<any> => shoppingLists.filter(list => list.id !== id)
    
    const deleteById = (id:string) => {
      db.transaction(
        (tx) => {
          tx.executeSql(`DELETE FROM shopList WHERE id = ?;`, [id]);
        },
        null,
        () => setShoppingLists( filterById(id) )
      )
    }
    
    const renderDeleteAction = () => {
        return <List.Item title={''} style={styles.deleteSwipeList} 
                    right={props => <List.Icon {...props} color={Colors.white} icon="delete" />} />
    }

    const renderEditAction = (id:string, name:string) => {
        return <TouchableHighlight onPressOut={()=>setModal({id,name,visible:true})}>
                  <List.Item title={''} style={styles.editSwipeList}
                    left={props => <List.Icon {...props} color={Colors.white} icon="pencil" />} />
          </TouchableHighlight>
    }
                                                    
        return <SafeAreaView style={styles.container}>
                <Divider />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={ ({id}) => id }
                    data={ shoppingLists }
                    renderItem={({ item, index }) => {
                                
                        return  <>
                                  <Swipeable useNativeAnimations 
                                              renderRightActions={renderDeleteAction} 
                                              renderLeftActions={()=>renderEditAction(item.id,item.name)}
                                              onSwipeableRightOpen={()=>deleteById(item.id)}
                                              overshootLeft={false}
                                              ref={ref => listRow[index] = ref}
                                              >
                                    <TouchableHighlight onPress={()=> navigation.navigate('List',item)}>
                                        <List.Item title={item.name}
                                                    left={props => <List.Icon {...props} color={Colors.deepPurple500} icon="basket" />}
                                                    right={props => <List.Icon {...props} icon="chevron-right" />}
                                                    style = {styles.shoppingList}
                                        />
                                    </TouchableHighlight>                                              
                                  </Swipeable>
                                  <Divider />
                                  </>
                        }}
                />
                <ListNameModal id={modal.id} 
                                name={modal.name}
                                visible={modal.visible}
                                hideModal={hideModal}
                                onChangeName={ newName => setModal({name:newName,id:modal.id,visible:modal.visible})}
                                onAccept={handleListNameChange}
                                />
                <FloatingButton onButtonPressed={()=>setModal({id:'',name:'',visible:true})} />
                </SafeAreaView>
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'stretch',
        flex:1,
    },
    editSwipeList: {
      backgroundColor:'green' , 
      justifyContent:'center',
      width:60,
    },
    deleteSwipeList: {
      backgroundColor:'red', 
      justifyContent:'center',
      flex:1,
    },
    shoppingList:{
      backgroundColor:'white',
      borderRadius:5,
    }
  });