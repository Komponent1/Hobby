import '@mui/material/styles';
import '@emotion/react';

declare module '@mui/material/styles' {
  interface Theme {
    width: string,
    device: {
      mobile: string,
      tablet: string,
      pc: string,
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    width?: string,
    device?: {
      mobile?: string,
      tablet?: string,
      pc?: string,
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
    }
  }
}
