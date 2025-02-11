import { createTheme } from '@mui/material/styles'; 

export const device = {
  mobile: `screen and (min-width: 375px)`,
  tablet: `screen and (min-width: 768px)`,
  pc: `screen and (min-width: 1024px)`,
  wide: `screen and (min-width: 1440px)`
}
export const width = `
  padding: 2rem;
  @media only ${device.mobile} {
    width: calc(100% - 4rem);  
  }
  @media only ${device.tablet} {
    width: calc(768px - 4rem);
  }
`;
export const background = (color: string) => `
  background: ${color};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
`;
export const modal = {
  width: '40rem',
  margin: 'auto',
  padding: '3rem',
  marginTop: 'calc(50vh - 10rem)'
}
export const color = {

};
const theme = createTheme({
  width, device, background, modal
});

export default theme;

/* Type 선언, 현재 tsconfig.json의 typeroots의 root설정이 동작하지 않는다. ./가 없는 쪽에선 동작하는걸 보니 root 설정 문제로 보인다. */
