import { SQLResultSet } from "expo-sqlite"
import { db } from "../database/database"

export const useSqlTransaction = async (
  query: string,
  args: any[]
): Promise<SQLResultSet> => {
  return new Promise<SQLResultSet>((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(query, args, (_, result) => resolve(result))
    })
  })
}
