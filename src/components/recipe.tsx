import React, { useState, useEffect } from "react"
import { Text, SafeAreaView, ScrollView } from "react-native"
import { List, IconButton } from "react-native-paper"
import { ListMenu } from "./listMenu"
import { db } from "../database/database"
import { Ingredient, Step, List as ListType } from "./types"
import { styles } from "./styles"

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
}: RecipeProps) => {
  const [visible, setVisible] = useState(false)
  const [article, setArticle] = useState("")
  const [lists, setLists] = useState<ListType[]>([])
  const [checked, setChecked] = useState(0)

  useEffect(() => {
    getShopLists()
  }, [])

  const handleCartPress = (article: string) => {
    setDefaultSelectedList()
    setArticle(article)
    showDialog()
  }

  const setDefaultSelectedList = () => {
    const actualLists = lists.filter((list) => list.id !== "0")
    const recipeShopList = actualLists.find((item) => item.name === recipeName)
    recipeShopList
      ? setChecked(+recipeShopList.id)
      : setLists([
          { id: "0", name: `Nueva lista (${recipeName})` },
          ...actualLists
        ])
  }

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  const saveArticle = () => {
    if (checked === 0) {
      db.transaction(
        async (tx) => {
          await tx.executeSql("INSERT INTO shopList (name) values (?)", [
            recipeName
          ])
        },
        undefined,
        async () => {
          await getShopLists()
        }
      )
    } else {
      db.transaction(async (tx) => {
        await tx.executeSql(
          "INSERT INTO articles (name, checked, listId) values (?,?,?)",
          [article, 0, checked]
        )
      })
    }

    hideDialog()
  }

  const getShopLists = async () => {
    db.transaction(async (tx) => {
      await tx.executeSql(
        "SELECT * FROM shopList",
        [],
        (_, { rows: { _array } }) => setLists(_array)
      )
    })
  }

  return (
    <>
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
      </SafeAreaView>
      <ListMenu
        key="listMenu"
        isVisible={visible}
        onDismissDialog={hideDialog}
        onAccept={saveArticle}
        shopLists={lists}
        checkedList={checked}
        onCheckList={setChecked}
      />
    </>
  )
}
