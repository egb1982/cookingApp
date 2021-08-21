import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { List, Checkbox, TextInput} from 'react-native-paper';
import { db } from '../database/database';


export const ShoppingList = ({route}):JSX.Element => {

    const [articles, setArticles ] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS articles(id INT PRIMARY KEY AUTOINCREMENT, name TEXT, checked BOOL, listId INTEGER FOREIGN KEY REFERENCES shopList(id))');
            tx.executeSql("SELECT * FROM articles WHERE id = ? ", [route.params.id], (_, { rows:{ _array } }) => { setArticles(_array); console.log(_array); });
        })
      },[]);


    const handleNewArticle = (text:string) => console.log(text);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <List.Section>

                        {
                            articles ?
                            articles.filter(element => !element.checked).map( item => <List.Item title={item.name} 
                                                             key={item.id}
                                                             right={props => <Checkbox {...props} status={'unchecked'} />}
                                                  />
                                        ) : null
                        }

                </List.Section>
                <TextInput 
                    value={""} 
                    onChangeText={handleNewArticle}
                    placeholder='Nuevo artículo'/>
                
                <List.Section>

                        {
                            articles ?
                            articles.filter(element => element.checked).map( item => <List.Item title={item.name} 
                                                            key={item.id}
                                                            right={props => <Checkbox {...props} status={'checked'} />}
                                                />
                                        ) : null
                        }

                </List.Section>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'stretch',
      flex:1,
    },
  });