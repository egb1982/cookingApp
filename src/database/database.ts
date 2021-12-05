import { Platform } from "react-native"
import * as SQLite from "expo-sqlite"
import { Article, List } from "../components/types"

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

const db = openDatabase()

const dropDatabaseTablesAsync = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("DROP TABLE IF EXISTS shopList")
        tx.executeSql("DROP TABLE IF EXISTS articles")
      },
      (error) => {
        console.log("db error droping tables")
        console.log(error)
        reject(error)
      },
      () => {
        resolve("dropDatabaseTablesAsync success")
      }
    )
  })
}

const initDatabaseAsync = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS shopList(
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT)`)

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS articles(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            checked INTEGER DEFAULT 0, 
            listId INTEGER, 
            FOREIGN KEY (listId) 
            REFERENCES shopList(id))`
        )
      },
      (error) => {
        console.log("db error creating tables")
        console.log(error)
        reject(error)
      },
      () => {
        resolve("initDatabaseAsync success")
      }
    )
  })
}

// SHOPPING LIST TABLE METHODS

const insertList = (listName: string, successCallback: () => void) => {
  db.transaction(
    (tx) => {
      tx.executeSql("INSERT INTO shopList (name) values (?)", [listName])
    },
    (error) => {
      console.log("db error insertList")
      console.log(error)
    },
    () => {
      successCallback()
    }
  )
}

const insertListAsync = (
  listName: string,
  successCallback: () => void
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO shopList (name) values (?)",
          [listName],
          (_, props) => resolve(props.insertId)
        )
      },
      (error) => {
        console.log("db error insertList")
        console.log(error)
      },
      () => {
        successCallback()
      }
    )
  })
}

const updateList = (
  listName: string,
  listId: number,
  successCallback: () => void
) => {
  db.transaction(
    (tx) => {
      tx.executeSql("UPDATE shopList SET name = ? WHERE id = ?", [
        listName,
        listId
      ])
    },
    (error) => {
      console.log("db error updateList")
      console.log(error)
    },
    () => {
      successCallback()
    }
  )
}

const deleteList = (id: number, successCallback: () => void) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`DELETE FROM shopList WHERE id = ?;`, [id])
    },
    (err) => console.log(err),
    () => successCallback()
  )
}

const getLists = (setListsFunction: (lists: List[]) => void) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM shopList", [], (_, { rows: { _array } }) =>
      setListsFunction(_array)
    )
  })
}

// ARTICLES TABLE METHODS
const getListItems = (
  listId: number,
  setListItems: (items: Article[]) => void
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT * FROM articles WHERE listId = ? ",
        [listId],
        (_, { rows: { _array } }) => setListItems(_array)
      )
    },
    (err) => console.error(err)
  )
}

const insertArticle = (
  itemName: string,
  listId: number,
  successCallback: () => void
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "INSERT INTO articles (name, checked, listId) values (?,?,?)",
        [itemName, 0, listId]
      )
    },
    (err) => console.error(err),
    () => {
      successCallback()
    }
  )
}

const updateArticle = (
  checked: number,
  itemId: number,
  successCallback: () => void
) => {
  db.transaction(
    (tx) => {
      tx.executeSql("UPDATE articles SET checked = ? WHERE id = ?", [
        checked,
        itemId
      ])
    },
    (err) => console.error(err),
    () => successCallback()
  )
}

const removeArticle = (itemId: number, successCallback: () => void) => {
  db.transaction(
    (tx) => {
      tx.executeSql("DELETE FROM articles WHERE id = ?", [itemId])
    },
    (err) => console.error(err),
    () => successCallback()
  )
}

const removeCheckedArticles = (listId: number, successCallback: () => void) => {
  db.transaction(
    (tx) => {
      tx.executeSql("DELETE FROM articles WHERE listId = ? AND checked = ? ", [
        listId,
        1
      ])
    },
    (err) => console.error(err),
    () => successCallback()
  )
}

export const database = {
  dropDatabaseTablesAsync,
  initDatabaseAsync,
  getLists,
  insertList,
  insertListAsync,
  updateList,
  deleteList,
  getListItems,
  insertArticle,
  updateArticle,
  removeArticle,
  removeCheckedArticles
}
