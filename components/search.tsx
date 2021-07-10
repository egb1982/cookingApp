import React, {useState} from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
 
export const Search = ():JSX.Element => {

    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchContainer}
        />
    );
}


const styles = StyleSheet.create({
    searchContainer: {
      marginHorizontal:15,
      marginVertical:5,
  }
});