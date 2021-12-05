import React, { useState } from "react"
import { Text, SafeAreaView, ScrollView } from "react-native"
import { List, IconButton } from "react-native-paper"
import { ListMenu } from "./listMenu"
import { Ingredient, Step, List as ListType } from "./types"
import { styles } from "./styles"
import { useLists } from "../hooks/useLists"
import { useListItems } from "../hooks/useListItems"

type RecipeProps = {
  ingredients: Array<Ingredient>
  steps: Array<Step>
  stepsExpanded: boolean
  ingredientsExpanded: boolean
  setIngredientsExpanded: (ingredientsExpanded: boolean) => void
  setStepsExpanded: (stepsExpanded: boolean) => void
  recipeName: string
}

export const Recipe: React.FC<RecipeProps> = ({
  ingredients,
  steps,
  stepsExpanded,
  ingredientsExpanded,
  setIngredientsExpanded,
  setStepsExpanded,
  recipeName
}) => {
  const [visible, setVisible] = useState(false)
  const [article, setArticle] = useState("")
  const [menulists, setMenuLists] = useState<ListType[]>([])
  const [selectedList, setSelectedList] = useState(0)
  const { lists, createListAsync } = useLists()
  const { createListItem } = useListItems(selectedList)

  const handleCartPress = (article: string) => {
    checkDefaultList()
    setArticle(article)
    showDialog()
  }

  const checkDefaultList = () => {
    const recipeList = lists.find((l) => l.name === recipeName)
    if (recipeList) {
      setSelectedList(recipeList.id)
      setMenuLists(lists)
    } else {
      setSelectedList(0)
      setMenuLists([{ id: 0, name: `Nueva lista (${recipeName}) ` }, ...lists])
    }
  }

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const saveArticle = () => {
    if (selectedList === 0) {
      createListAsync(recipeName).then((newListId) =>
        createListItem(article, newListId)
      )
    } else {
      createListItem(article, selectedList)
    }
    hideDialog()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <List.Section>
          <List.Accordion
            title="Ingredientes"
            expanded={ingredientsExpanded}
            onPress={() => setIngredientsExpanded(!ingredientsExpanded)}
          >
            {ingredients
              ? ingredients.map((ingr) => (
                  <List.Item
                    title={<Text>{ingr.name}</Text>}
                    description={<Text>{ingr.quantity}</Text>}
                    key={`ingredient_${ingr._id}`}
                    style={styles.ingredients}
                    right={() => (
                      <IconButton
                        onPress={() =>
                          handleCartPress(`${ingr.name} (${ingr.quantity})`)
                        }
                        icon="cart"
                      />
                    )}
                  />
                ))
              : null}
          </List.Accordion>
          <List.Accordion
            title="Pasos a seguir"
            expanded={stepsExpanded}
            onPress={() => setStepsExpanded(!stepsExpanded)}
          >
            {steps
              ? steps.map((step, index) => (
                  <List.Item
                    title={`Paso ${index + 1}`}
                    description={<Text>{step.description}</Text>}
                    key={`step_${step._id}`}
                    style={styles.steps}
                    descriptionNumberOfLines={0}
                  />
                ))
              : null}
          </List.Accordion>
        </List.Section>
      </ScrollView>
      <ListMenu
        key="listMenu"
        isVisible={visible}
        onDismissDialog={hideDialog}
        onAccept={saveArticle}
        shopLists={menulists}
        checkedList={selectedList}
        onCheckList={setSelectedList}
      />
    </SafeAreaView>
  )
}
