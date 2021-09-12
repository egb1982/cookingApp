import React, {useState, useEffect} from 'react';
import { StyleSheet, Text , SafeAreaView, ScrollView} from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { ListMenu } from "./listMenu";
import { db } from "../database/database";

type RecipeProps = {
    ingredients:Array<Object>;
    steps:Array<Object>;
    stepsExpanded:boolean;
    ingredientsExpanded:boolean;
    setIngredientsExpanded: (ingredientsExpanded:boolean) => void;
    setStepsExpanded: (stepsExpanded:boolean) => void;
    recipeName:string;
}

export const Recipe = ({ingredients, 
                        steps, 
                        stepsExpanded, 
                        ingredientsExpanded, 
                        setIngredientsExpanded, 
                        setStepsExpanded,
                        recipeName }:RecipeProps )=> {

    const [visible, setVisible] = useState(false);
    const [article, setArticle] = useState('');
    const [lists, setLists] = useState([]);
    const [checked, setChecked] = useState(0);

    useEffect(()=> {
        getShopLists();
    },[]);

    const handleCartPress = (article:string) => {
        setDefaultSelectedList();
        setArticle(article);
        showDialog();
    }

    const setDefaultSelectedList = ()=> {
        setLists(lists.filter(list => list.id !==0))
        const recipeShopList = lists.find( item => item.name === recipeName );
        (recipeShopList) ? 
            setChecked(recipeShopList.id)
        : 
            setLists([{id:0, name:`Nueva lista (${recipeName})`}, ...lists ]);
    }

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
  
    const saveArticle = () => {

        if (checked === 0) {
            db.transaction(async (tx) => {
                await tx.executeSql("INSERT INTO shopList (name) values (?)", [recipeName]);
            },
            null,
            async () => {
                await getShopLists();
                console.log(lists);
            });
        } else {
            db.transaction(async (tx) => {
                await tx.executeSql("INSERT INTO articles (name, checked, listId) values (?,?,?)", [article,0,checked]);
            });
        }

        hideDialog();
    }

    const getShopLists = async () => {
        db.transaction(async (tx) => {
            await tx.executeSql("SELECT * FROM shopList", [], (_, { rows:{ _array } }) => setLists(_array));
        })
    }

    return  <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <List.Section>
                        <List.Accordion title='Ingredientes' 
                                        expanded={ingredientsExpanded} 
                                        onPress={()=>setIngredientsExpanded(!ingredientsExpanded)}>
                            {
                                ingredients ?
                                    ingredients.map( ingr => <List.Item title={<Text>{ingr.name}</Text>}
                                                                        description = {<Text>{ingr.quantity}</Text>} 
                                                                        key={`ingredient_${ingr._id}`}
                                                                        style={styles.ingredients} 
                                                                        right={() => <IconButton onPress={()=> handleCartPress(`${ingr.name} (${ingr.quantity})`)} icon="cart" />}
                                                            />
                                                    ) : null
                            }
                        </List.Accordion>
                        <List.Accordion title='Pasos a seguir' expanded={stepsExpanded} onPress={()=>setStepsExpanded(!stepsExpanded)}>
                            { 
                                steps ? steps.map( (step, index )=> <List.Item title={`Paso ${index + 1}`} 
                                                                                description={<Text>{step.description}</Text>} 
                                                                                key={`step_${step._id}`}
                                                                                style={styles.steps}
                                                                                />)
                                        :null
                            }
                        </List.Accordion>
                    </List.Section>
                </ScrollView>
            </SafeAreaView>
            <ListMenu 
                key='listMenu'
                isVisible={visible} 
                onDismissDialog={hideDialog} 
                onAccept={saveArticle} 
                shopLists={lists}
                checkedList={checked}
                onCheckList={setChecked}
            />
        </>
}

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