import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "rgba(200,200,200,0.3)",
    width: 150,
    margin: 10,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3
  },
  cardBody: {
    padding: 5,
    height: 45
  },
  cardHeader: {
    fontSize: 25,
    color: "#fff",
    textShadowColor: "#000",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    paddingLeft: 3
  },
  cardImage: {
    width: "100%",
    height: 150,
    justifyContent: "space-between",
    paddingBottom: 3
  },
  difficultyRow: {
    flexDirection: "row",
    paddingLeft: 4,
    paddingBottom: 2
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "stretch",
    flex: 1
  },
  containerCenter: {
    backgroundColor: "#fff",
    alignItems: "center",
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
  },
  radioButtonGroup: {
    flexDirection: "row",
    padding: 5
  },
  radioButtonText: {
    alignSelf: "center",
    paddingVertical: 10,
    fontWeight: "bold"
  },
  editSwipeList: {
    backgroundColor: "green",
    justifyContent: "center",
    width: 60
  },
  shoppingList: {
    backgroundColor: "white",
    borderRadius: 5
  },
  ingredients: {
    backgroundColor: "rgba(209,236,241,.5)",
    borderBottomWidth: 1,
    borderBottomColor: "#fff"
  },
  steps: {
    backgroundColor: "rgba(255,243,205,.5)",
    borderBottomWidth: 1,
    borderBottomColor: "#fff"
  }
})
