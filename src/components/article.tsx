import React from "react"
import { List, Checkbox, Divider, Colors } from "react-native-paper"
import { Swipeable } from "react-native-gesture-handler"
import { Article as ArticleType } from "./types"
import { styles } from "./styles"

type ArticleProps = {
  item: ArticleType
  onPressCheckbox: (id: number, value: boolean) => void
  onSwipeDelete: (id: number) => void
}

export const Article: React.FC<ArticleProps> = ({
  item,
  onPressCheckbox,
  onSwipeDelete
}) => {
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
