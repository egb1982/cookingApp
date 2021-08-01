import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { List, Checkbox } from 'react-native-paper';

type Articles = {
    _id:string,
    name:string,
    quantity:string,
}

type List = {
    _id:string,
    name:string,
    articles:Array<Articles>,
}

export const ShoppingList = ({route}):JSX.Element => {
    const {articles} = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <List.Section>

                        {
                            articles ?
                            articles.map( item => <List.Item title={item.name} 
                                                             key={item._id}
                                                             right={props => <Checkbox {...props} status={'unchecked'} />}
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