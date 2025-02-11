export const device = {
  mobile: 'screen and (max-width: 375px)',
  tablet: 'screen and (max-width: 768px)',
  pc: 'screen and (max-width: 1024px)',
  wide: 'screen and (max-width: 1440px)',
};
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
  marginTop: 'calc(50vh - 10rem)',
};
export const main = `
  width: 95%;
  max-width: 1024px;
  margin: auto;
`;
const theme = {
  main, width, device, background, modal,
};

export default theme;
