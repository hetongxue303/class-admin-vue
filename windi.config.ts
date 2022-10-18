import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      screens: {},
      colors: {
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily: {},
      spacing: {},
      borderRadius: {},
    },
  },
  plugins: [],
})
