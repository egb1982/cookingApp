import { Platform } from "react-native"
import * as SQLite from "expo-sqlite"

const openDatabase = () => {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {}
        }
      }
    }
  }

  const db = SQLite.openDatabase("db.db")
  return db
}

export const db = openDatabase()
