import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { Card } from "../components/card";
import { Search } from '../components/search';

export const MainScreen = ({navigation}):JSX.Element => {
    const [foodList,setList] = useState([]);

    useEffect(() => {
      fetch("https://recetasserver.herokuapp.com/api/recipes")
      .then(response => response.json())
      .then(data => setList(data));
    },[]);
  
    return (
      <SafeAreaView style={styles.container}>
        <Search />
        <FlatList
          showsHorizontalScrollIndicator={false}
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