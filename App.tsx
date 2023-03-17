import * as React from 'react';

import MainStack from './src/stack/MainStack';
import { AuthProvider } from "./src/context/AuthContext"
import { NativeBaseProvider, extendTheme, theme as nbTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.cyan,
  },
  fontConfig: {
    Nexa: {
      100: {
        normal: "NexaLight",
        italic: "NexaLightItalic",
      },
      200: {
        normal: "NexaLight",
        italic: "NexaLightItalic",
      },
      300: {
        normal: "NexaLight",
        italic: "NexaLightItalic",
      },
      400: {
        normal: "NexaRegular",
        italic: "NexaItalic",
      },
      500: {
        normal: "NexaMedium",
      },
      600: {
        normal: "NexaMedium",
        italic: "NexaMediumItalic",
      },
      700: {
        normal: 'NexaBold',
      },
      800: {
        normal: 'NexaBold',
        italic: 'NexaBoldItalic',
      },
      900: {
        normal: 'NexaHeavy',
        italic: 'NexaHeavyItalic',
      },
    },
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Nexa",
    body: "Nexa",
    mono: "Nexa",
  },
});

export default function App() {

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </NativeBaseProvider>
  );
}