import React from 'react';

type Props = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  color: string;
  children: React.ReactNode;
  customClass?: string;
};
/**
 * color => tailwind text-color
 * https://tailwindcss.com/docs/text-color
 */
const Typography: React.FC<Props> = ({
  children, customClass = '', type, color = 'text-black',
}) => {
  switch (type) {
    case 'h1':
      return <h1 className={`my-4 text-3xl md:text-5xl opacity-75 font-bold leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</h1>;
    case 'h2':
      return <h2 className={`my-4 text-2xl md:text-4xl opacity-75 font-bold leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</h2>;
    case 'h3':
      return <h3 className={`my-4 text-xl md:text-2xl opacity-75 font-bold leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</h3>;
    case 'h4':
      return <h4 className={`my-4 text-lg md:text-xl opacity-75 font-bold leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</h4>;
    case 'h5':
      return <h5 className={`my-4 text-base md:text-lg opacity-75 font-bold leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</h5>;
    case 'h6':
      return <h6 className={`my-4 text-sm md:text-base opacity-75 font-bold leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</h6>;
    case 'p':
      return <p className={`my-4 text-sm md:text-base opacity-75 font-normal leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</p>;
    default:
      return <p className={`my-4 text-sm md:text-base opacity-75 font-normal leading-tight text-center md:text-left ${customClass} ${color}`}>{children}</p>;
  }
};

export default Typography;
