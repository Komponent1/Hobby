import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Chip from './article.components.chip';
import {TAG_COLORS} from '../article.constant';

type Props = {
  id: string;
  photo?: string;
  title: string;
  tags: string[];
};
const Card: React.FC<Props> = ({
  id, photo, title, tags,
}) => (
  <div className="self-stretch mb-2 hover:transition-transform hover:transform hover:scale-105">
    <Link href={`/article/${id}`}>
      <div className="rounded-sm shadow-md h-full">
        <div className="h-52 grid place-items-center bg-slate-100 relative">
          {photo ? <Image fill src={photo} alt={title} className="bg:slate-100 m-0 rounded-t lazy object-contain" /> : <div className="w-full h-full" />}
        </div>
        <div className="px-6 py-5">
          <div className="font-semibold text-lg mb-2">
            {title}
          </div>
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <Chip label={tag} key={`${title}_${tag}`} {...TAG_COLORS[index % TAG_COLORS.length]} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default Card;
