import * as React from "react"
import { StyleSheet } from "react-native"
import { FAB } from "react-native-paper"

export const FloatingButton: React.FC<{ onButtonPressed: () => void }> = ({
  onButtonPressed
}) => <FAB style={styles.fab} small icon="plus" onPress={onButtonPressed} />

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
})
