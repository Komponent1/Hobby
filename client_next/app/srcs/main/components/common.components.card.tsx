import React from 'react';
import Link from 'next/link';

type Props = {
  link: string;
  text: string;
  description: string;
};
const Card: React.FC<Props> = ({
  link,
  text,
  description,
}) => (
  <div className="block max-w-sm p-6 bg-slate-900 rounded-lg shadow hover:bg-gray-900 hover:transition-transform hover:transform hover:scale-105">
    <Link href={link}>
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{text}</h5>
        <p className="font-normal text-gray-400">{description}</p>
      </div>
    </Link>
  </div>
);

export default Card;
