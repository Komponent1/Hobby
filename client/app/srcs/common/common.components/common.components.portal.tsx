import React, { useEffect, useState } from 'react';
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};
const Portal: React.FC<Props> = ({children}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined' || !mounted) return null;

  return mounted ? createPortal(children, document.getElementById('modal-root') as HTMLElement) : null;
};
export default Portal;
