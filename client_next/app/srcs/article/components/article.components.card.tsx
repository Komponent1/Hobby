import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  id: string;
  photo?: string;
  title: string;
  description: string;
};
const Card: React.FC<Props> = ({
  id, photo, title, description,
}) => (
  <div className="self-stretch p-2 mb-2 hover:transition-transform hover:transform hover:scale-105">
    <Link href={`/article/${id}`}>
      <div className="rounded shadow-md h-full h">
        <div className="h-52 grid place-items-center bg-slate-100">
          {photo ? <Image height="100%" width="100%" src={photo} alt={title} className="bg:slate-100 m-0 rounded-t lazy" /> : <div className="w-full h-full" />}
        </div>
        <div className="px-6 py-5">
          <div className="font-semibold text-lg mb-2">
            {title}
          </div>
          <p className="text-slate-800">
            {description}
          </p>
        </div>
      </div>
    </Link>
  </div>
);

export default Card;
