import React, {useState} from 'react';
import { FlatList,TouchableOpacity,Text, StyleSheet, View } from "react-native";
import { List, Divider, Colors} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from "react-native-gesture-handler";

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
    const renderDeleteAction = () => {
        return <List.Item title={''} style={{backgroundColor:'red', width:'100%'}} 
                    right={props => <List.Icon {...props} color={Colors.white} icon="delete" />} />
    }

    const renderEditAction = () => {
        return <List.Item title={''} style={{backgroundColor:'green' , width:'100%'}}
                    left={props => <List.Icon {...props} color={Colors.white} icon="pencil" />} />
    }
                                                    
        return <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={ ({_id}) => _id }
                    data={ shoppingLists }
                    renderItem={({ item }) => {
                                
                        return  <Swipeable useNativeAnimations 
                                            renderRightActions={renderDeleteAction} 
                                            renderLeftActions={renderEditAction}>
                                  <List.Section>
                                      <TouchableOpacity onPress={()=> navigation.navigate('List',item)}>
                                          <List.Item title={item.name}
                                                      left={props => <List.Icon {...props} color={Colors.deepPurple500} icon="basket" />}
                                                      right={props => <List.Icon {...props} icon="chevron-right" />}
                                                      style={{backgroundColor:'white'}}
                                          />
                                      </TouchableOpacity>
                                  </List.Section>
                                  <Divider />                                              
                                </Swipeable>
                        }}
                />
                </SafeAreaView>
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'stretch',
        flex:1,
      },
  });