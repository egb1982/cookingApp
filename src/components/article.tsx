import React from "react"
import { StyleSheet } from "react-native"
import { List, Checkbox, Divider, Colors } from "react-native-paper"
import { Swipeable } from "react-native-gesture-handler"
import { Article as ArticleType } from "./types"

type ArticleProps = {
  item: ArticleType
  onPressCheckbox: (id: number, value: boolean) => void
  onSwipeDelete: (id: number) => void
}

export const Article = ({
  item,
  onPressCheckbox,
  onSwipeDelete
}: ArticleProps): JSX.Element => {
  const status = item.checked ? "checked" : "unchecked"
  const key = item.checked ? `${status}_${item.id}` : `${status}_${item.id}`

  const renderDeleteAction = () => {
    return (
      <List.Item
        title={""}
        style={styles.deleteSwipeList}
        right={(props) => (
          <List.Icon {...props} color={Colors.white} icon="delete" />
        )}
      />
    )
  }

  const renderCheckAction = (isCheked: boolean) => {
    const icon = isCheked ? "square-outline" : "checkbox-marked"
    return (
      <List.Item
        title={""}
        style={styles.checkSwipeList}
        left={(props) => (
          <List.Icon {...props} color={Colors.white} icon={icon} />
        )}
      />
    )
  }

  return (
    <>
      <Divider />
      <Swipeable
        useNativeAnimations
        renderRightActions={renderDeleteAction}
        renderLeftActions={() => renderCheckAction(item.checked)}
        onSwipeableRightOpen={() => onSwipeDelete(item.id)}
        onSwipeableLeftOpen={() => onPressCheckbox(item.id, !item.checked)}
      >
        <List.Item
          title={item.name}
          key={key}
          right={(props) => (
            <Checkbox
              {...props}
              status={status}
              onPress={() => onPressCheckbox(item.id, !item.checked)}
            />
          )}
          style={[
            item.checked ? styles.checkedArticle : styles.uncheckedArticle
          ]}
          titleStyle={item.checked ? styles.checkedArticleTitle : null}
        />
      </Swipeable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "stretch",
    flex: 1
  },
  checkSwipeList: {
    backgroundColor: "blue",
    justifyContent: "center",
    flex: 1
  },
  deleteSwipeList: {
    backgroundColor: "red",
    justifyContent: "center",
    flex: 1
  },
  uncheckedArticle: {
    backgroundColor: "rgb(208, 255, 205)"
  },
  checkedArticle: {
    backgroundColor: "rgb(255, 215, 206)"
  },
  checkedArticleTitle: {
    textDecorationLine: "line-through"
  }
})
