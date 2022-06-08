import { createTheme } from '@mui/material/styles'; 

export const device = {
  mobile: `screen and (min-width: 375px)`,
  tablet: `screen and (min-width: 768px)`,
  pc: `screen and (min-width: 1024px)`,
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

export const color = {

};
const theme = createTheme({
  width, device
});

export default theme;

/* Type 선언, 현재 tsconfig.json의 typeroots의 root설정이 동작하지 않는다. ./가 없는 쪽에선 동작하는걸 보니 root 설정 문제로 보인다. */
