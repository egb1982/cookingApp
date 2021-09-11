import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Recipe } from '../components/recipe';


export const RecipeScreen = ({route}):JSX.Element => {

    const [ingredientsExpanded, setIngredientsExpanded] = useState(true);
    const [stepsExpanded, setStepsExpanded] = useState(true);
    const { ingredients, steps, name } = route.params;

    return <Recipe ingredients={ingredients} 
                    steps={steps} 
                    stepsExpanded={stepsExpanded}
                    ingredientsExpanded={ingredientsExpanded}
                    setIngredientsExpanded={setIngredientsExpanded}
                    setStepsExpanded={setStepsExpanded}
                    recipeName={name}

            />
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'stretch',
      flex:1,
    }
  });