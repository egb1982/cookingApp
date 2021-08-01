import React, {useState} from 'react';
import { FlatList,TouchableHighlight,StyleSheet } from "react-native";
import { List, Divider, Colors} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from "react-native-gesture-handler";
import { ListNameModal } from "./ListNameModal";
import { FloatingButton } from './floatingButton';

export const ListSelector = ({navigation}):JSX.Element => {

    const [shoppingLists,setShoppingLists] = useState([{_id:'7489237423894', 
                                                        name:'Compra Tegut', 
                                                        articles: [
                                                          {_id: '435435543', name:'Harina',quantity:'1 kilo'},
                                                          {_id: '435343455', name:'Huevos',quantity:'1 docena'},
                                                          {_id: '756546445', name:'Leche',quantity:'1 Litro'},
                                                        ] },
                                                        {_id:'753465743756', 
                                                        name:'Compra Lidl', 
                                                        articles: [
                                                          {_id: '321322314', name:'Salmón',quantity:'250 gr.'},
                                                          {_id: '576535431', name:'Pan',quantity:'3 Paquetes'},
                                                          {_id: '123987452', name:'Arróz',quantity:'1 kilo'},
                                                        ] }
                                                    ]);

    const [modal, setModal] = useState({visible:false,name:'',id:''});          
    
    let listRow:Array<any> = [];

    const hideModal = () => { 
      setModal({visible:false,name:'',id:''}); 
      listRow.map(row => row.close());
    }

    const handleListNameChange = () => {
      if (modal.id != ''){
        const currentList = shoppingLists.find( list => list._id === modal.id );
        if (currentList) {
          currentList.name = modal.name;
          setShoppingLists([...filterById(currentList._id),currentList]);
        }  
      } else {
        const id = new Date;
        setShoppingLists([...shoppingLists, {_id:id.toString(), name:modal.name, articles:[]}]);
      }
      hideModal();
    }
    
    const filterById = (id:string):Array<any> => shoppingLists.filter(list => list._id !== id)

    const deleteById = (id:string) => setShoppingLists( filterById(id) )
    
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
                    keyExtractor={ ({_id}) => _id }
                    data={ shoppingLists }
                    renderItem={({ item, index }) => {
                                
                        return  <>
                                  <Swipeable useNativeAnimations 
                                              renderRightActions={renderDeleteAction} 
                                              renderLeftActions={()=>renderEditAction(item._id,item.name)}
                                              onSwipeableRightOpen={()=>deleteById(item._id)}
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