
import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { Card } from "./card";
import { Search } from './search';

export const RecipesList = ({navigation}):JSX.Element => {

    const [foodList,setList] = useState([]);
    const [term,setTerm] = useState('');

    useEffect(() => {
    if (term === "") getRecipes();
    },[term]);

    const getRecipes = () => {
    fetch("https://recetasserver.herokuapp.com/api/recipes")
    .then(response => response.json())
    .then(data => setList(data));
    }

    const handleSearch = () => {
    fetch(`https://recetasserver.herokuapp.com/api/recipes/search/${term}`)
    .then(response => response.json())
    .then(data => setList(data));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Search term={term} 
                    onChangeSearch={setTerm} 
                    onTermSend={handleSearch}
                    />
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={ ({_id}) => _id }
                data={ foodList }
                numColumns={2}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={()=> navigation.navigate('Recipe',item)}>
                        <Card key={item._id} recipe={item} />
                    </TouchableOpacity>
            }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      flex:1,
    },
  });