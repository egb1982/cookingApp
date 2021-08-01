import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { Recipe } from '../components/recipe';


export const RecipeScreen = ({route}):JSX.Element => {

    const [ingredientsExpanded, setIngredientsExpanded] = useState(true);
    const [stepsExpanded, setStepsExpanded] = useState(true);
    const { ingredients, steps } = route.params;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <Recipe ingredients={ingredients} 
                    steps={steps} 
                    stepsExpanded={stepsExpanded}
                    ingredientsExpanded={ingredientsExpanded}
                    setIngredientsExpanded={setIngredientsExpanded}
                    setStepsExpanded={setStepsExpanded}

            />
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'stretch',
      flex:1,
    }
  });