import { useEffect, useState } from "react"
import { Article } from "../components/types"
import { database } from "../database/database"

export const useListItems = (listId: number) => {
  const [listArticles, setListArticles] = useState<Article[]>([])
  useEffect(() => {
    refreshListItems(listId)
  }, [listId])

  const refreshListItems = (listId: number) => {
    if (listId > 0) {
      database.getListItems(listId, setListArticles)
    }
  }

  const createListItem = (itemName: string, listId: number) => {
    if (
      itemName !== "" &&
      itemName !== undefined &&
      listId > 0 &&
      listId !== undefined
    ) {
      database.insertArticle(itemName, listId, () => refreshListItems(listId))
    }
  }

  const changeItemCheck = (
    isChecked: number,
    itemId: number,
    listId: number
  ) => {
    database.updateArticle(isChecked, itemId, () => refreshListItems(listId))
  }

  const deleteListItem = (itemId: number, listId: number) => {
    database.removeArticle(itemId, () => refreshListItems(listId))
  }

  const cleanAllChecked = (listId: number) => {
    database.removeCheckedArticles(listId, () => refreshListItems(listId))
  }

  return {
    listArticles,
    createListItem,
    changeItemCheck,
    deleteListItem,
    cleanAllChecked
  }
}
