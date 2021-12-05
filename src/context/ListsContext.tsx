// force the state to clear with fast refresh in Expo
// @refresh reset

import React, { useContext, createContext, useState } from "react"
import { List } from "../components/types"

const ListsContext = createContext<List[] | undefined>(undefined)
type SetLists = (lists: List[]) => void
const SetListsContext = React.createContext<SetLists | undefined>(undefined)

export const ListsContextProvider: React.FunctionComponent = ({ children }) => {
  const [lists, setLists] = useState<List[]>([])

  return (
    <ListsContext.Provider value={lists}>
      <SetListsContext.Provider value={setLists}>
        {children}
      </SetListsContext.Provider>
    </ListsContext.Provider>
  )
}

export function useListsContext(): List[] {
  const listsContext = useContext(ListsContext)
  if (listsContext === undefined) {
    throw new Error("useListsContext must be used within a ListContextProvider")
  }
  return listsContext
}
export function useSetListsContext(): SetLists {
  const listsUpdateContext = useContext(SetListsContext)
  if (listsUpdateContext === undefined) {
    throw new Error(
      "useSetListsContext must be used within a ListContextProvider"
    )
  }
  return listsUpdateContext
}
