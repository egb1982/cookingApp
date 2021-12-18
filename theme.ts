import { DefaultTheme } from "react-native-paper"

console.log(DefaultTheme.colors)

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#32a852",
    accent: "#015e1a"
  }
}
