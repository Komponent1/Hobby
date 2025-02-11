import '@mui/material/styles';
import '@emotion/react';

declare module '@mui/material/styles' {
  interface Theme {
    width: string,
    device: {
      mobile: string,
      tablet: string,
      pc: string,
      wide: string,
    },
    background: (color: string) => string,
    modal: {
      width: string,
      margin: string,
      padding: string,
      marginTop: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    width?: string,
    device?: {
      mobile?: string,
      tablet?: string,
      pc?: string,
      wide?: string
    },
    background?: (color: string) => string,
    modal?: {
      width?: string,
      margin?: string,
      padding?: string,
      marginTop?: string
    }
  }
}

declare module '@emotion/react' {
  export interface Theme {
    width: string,
    device: {
      mobile: string,
      tablet: string,
      pc: string,
      wide: string
    }
    background: (color: string) => string,
    modal: {
      width: string,
      margin: string,
      padding: string,
      marginTop: string
    }
  }
}
