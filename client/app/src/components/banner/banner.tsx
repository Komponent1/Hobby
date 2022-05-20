import React from 'react';

type Prop = {
  title: string
}
const Banner: React.FC<Prop> = ({ title }) => {
  return (
    <div>{title}</div>
  )
};

export default Banner;
