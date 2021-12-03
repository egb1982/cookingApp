export type Recipe = {
  _id: string
  name: string
  image: Uint8Array
  difficulty: number
  category: string
}

export type Article = {
  id: number
  name: string
  checked: boolean
  listId: number
}
export type List = {
  id: string
  name: string
}

export type Ingredient = {
  _id: string
  name: string
  quantity: string
}

export type Step = {
  _id: string
  description: string
}
