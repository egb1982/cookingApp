import React from "react"
import { StyleSheet, View } from "react-native"
import { Avatar } from "react-native-paper"
import { styles } from "../styles"

export const Difficulty: React.FC<{ value: number }> = ({ value }) => {
  let color = "red"
  if (value === 1) {
    color = "green"
  } else if (value === 2) {
    color = "yellow"
  }

  return (
    <View style={styles.difficultyRow}>
      {[...Array(value)].map((element, index) => (
        <Avatar.Icon
          size={16}
          icon="chef-hat"
          key={index}
          style={{ backgroundColor: color }}
        />
      ))}
    </View>
  )
}
