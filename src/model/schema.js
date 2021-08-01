import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const shopListSchema =  appSchema({
  version: 1,
  tables: [
    tableSchema({
        name: 'lists',
        columns: [
          { name: 'name', type: 'string' },
        ]
      }),
    tableSchema({
        name: 'articles',
        columns: [
          { name: 'name', type: 'string' },
          { name: 'quantity', type: 'string' },
          { name: 'list_id', type: 'string', isIndexed:true },  
        ]
      }),      
  ]
})
