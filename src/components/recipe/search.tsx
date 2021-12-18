import React from "react"
import { Searchbar } from "react-native-paper"
import { StyleSheet } from "react-native"

type searchProps = {
  term: string
  onChangeSearch: (query: string) => void
  onTermSend: () => void
}

export const Search: React.FC<searchProps> = ({
  term,
  onChangeSearch,
  onTermSend
}) => {
  return (
    <Searchbar
      placeholder="Que cocinamos hoy?"
      onChangeText={onChangeSearch}
      onEndEditing={onTermSend}
      value={term}
      style={styles.searchContainer}
      onIconPress={onTermSend}
    />
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5
  }
})
