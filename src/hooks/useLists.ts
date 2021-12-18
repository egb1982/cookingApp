import { useEffect } from "react"
import { List } from "../components/types"
import { useListsContext, useSetListsContext } from "../context/ListsContext"
import { database } from "../database/database"

export const useLists = () => {
  const lists: List[] = useListsContext()
  const setLists: (lists: List[]) => void = useSetListsContext()

  useEffect(() => {
    refreshLists()
  }, [])

  const refreshLists = () => database.getLists(setLists)

  const createList = (listName: string): void => {
    if (listName !== "" && listName !== undefined) {
      return database.insertList(listName, () => refreshLists)
    }
  }

  const createListAsync = async (listName: string) => {
    if (listName !== "" && listName !== undefined) {
      return database.insertListAsync(listName, refreshLists)
    }
  }

  const deleteList = (listId: number): void => {
    if (listId !== undefined && listId !== 0) {
      return database.deleteList(listId, refreshLists)
    }
  }

  const renameList = (newName: string, listId: number): void => {
    if (listId !== undefined && listId !== 0) {
      return database.updateList(newName, listId, refreshLists)
    }
  }

  return {
    lists,
    createList,
    createListAsync,
    deleteList,
    renameList
  }
}
