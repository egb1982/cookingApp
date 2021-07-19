import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
 

type searchProps = {
    term: string;
    onChangeSearch: (query:string) => void;
    onTermSend: () => void;
}

export const Search = ({ term, onChangeSearch, onTermSend }:searchProps):JSX.Element => {

    return (
        <Searchbar
            placeholder="Que te apetece?"
            onChangeText={onChangeSearch}
            onEndEditing={onTermSend}
            value={term}
            style={styles.searchContainer}
        />
    );
}


const styles = StyleSheet.create({
    searchContainer: {
      marginHorizontal:15,
      marginTop:10,
      marginBottom:5,
  }
});