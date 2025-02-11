import React, { useState } from 'react';
import SidemenuPresenter from './sidemenuPresenter';

type Prop = {
  children: JSX.Element
};
const SidemenuContainer: React.FC<Prop> = ({ children }) => {
  const [ open, setOpen ] = useState<boolean>(false);
  const toggle = () => setOpen((open: boolean) => !open);

  return (
    <SidemenuPresenter open={open} toggle={toggle}>
      {children}
    </SidemenuPresenter>
  )
};

export default SidemenuContainer;