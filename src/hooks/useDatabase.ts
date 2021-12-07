import React, { useEffect } from "react"
import { database } from "../database/database"

// force the state to clear with fast refresh in Expo
// @refresh reset

export const useDatabase = (): boolean => {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false)

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //await database.dropDatabaseTablesAsync()
        await database.initDatabaseAsync()

        setDBLoadingComplete(true)
      } catch (e) {
        console.warn(e)
      }
    }

    loadDataAsync()
  }, [])

  return isDBLoadingComplete
}
