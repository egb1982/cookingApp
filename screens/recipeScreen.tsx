import React from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView} from 'react-native';
import { List } from 'react-native-paper';


export const RecipeScreen = ({route}):JSX.Element => {

    const [ingredientsExpanded, setIngredientsExpanded] = React.useState(true);
    const [stepsExpanded, setStepsExpanded] = React.useState(true);
    const { ingredients, steps } = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <List.Section>
                <List.Accordion title='Ingredientes' expanded={ingredientsExpanded} onPress={()=>setIngredientsExpanded(!ingredientsExpanded)}>
                    {
                        ingredients ?
                            ingredients.map( ingr => <List.Item title={<Text>{ingr.name}</Text>}
                                description = {<Text>{ingr.quantity}</Text>} 
                                key={ingr._id}
                                style={styles.ingredients} 
                            />)
                            : null
                    }
                </List.Accordion>
                <List.Accordion title='Pasos a seguir' expanded={stepsExpanded} onPress={()=>setStepsExpanded(!stepsExpanded)}>
                    { 
                        steps ? steps.map( (step, index )=> <List.Item title={`Paso ${index+1}`} 
                                                                        description={<Text>{step.description}</Text>} 
                                                                        key={step._id}
                                                                        style={styles.steps}
                                                                        />)
                                :null
                    }
                </List.Accordion>
            </List.Section>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'stretch',
      flex:1,
    },
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