import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { List } from 'react-native-paper';

type RecipeProps = {
    ingredients:Array<Object>;
    steps:Array<Object>;
    stepsExpanded:boolean;
    ingredientsExpanded:boolean;
    setIngredientsExpanded: (ingredientsExpanded:boolean) => void;
    setStepsExpanded: (stepsExpanded:boolean) => void;
}

export const Recipe = ({ingredients, 
                        steps, 
                        stepsExpanded, 
                        ingredientsExpanded, 
                        setIngredientsExpanded, 
                        setStepsExpanded}:RecipeProps )=>
<List.Section>
    <List.Accordion title='Ingredientes' 
                    expanded={ingredientsExpanded} 
                    onPress={()=>setIngredientsExpanded(!ingredientsExpanded)}>
        {
            ingredients ?
                ingredients.map( ingr => <List.Item title={<Text>{ingr.name}</Text>}
                                                    description = {<Text>{ingr.quantity}</Text>} 
                                                    key={ingr._id}
                                                    style={styles.ingredients} 
                                                    right={props => <TouchableOpacity><List.Icon {...props} icon="cart" /></TouchableOpacity>}
                                        />
                                ) : null
        }
    </List.Accordion>
    <List.Accordion title='Pasos a seguir' expanded={stepsExpanded} onPress={()=>setStepsExpanded(!stepsExpanded)}>
        { 
            steps ? steps.map( (step, index )=> <List.Item title={`Paso ${index + 1}`} 
                                                            description={<Text>{step.description}</Text>} 
                                                            key={step._id}
                                                            style={styles.steps}
                                                            />)
                    :null
        }
    </List.Accordion>
</List.Section>

const styles = StyleSheet.create({
    ingredients:{
        backgroundColor:'rgba(209,236,241,.5)',
        borderBottomWidth:1,
        borderBottomColor:'#fff',
    },
    steps:{
        backgroundColor:'rgba(255,243,205,.5)',
        borderBottomWidth:1,
        borderBottomColor:'#fff',
    }
  });