import Link from 'next/link';
import React from 'react';
import { Information } from './dto/informations';

type Props = {
  informations: Information[];
};
const InformationsPage: React.FC<Props> = ({informations}) => (
  <div>
    <h1>Informations</h1>
    {informations.map((information) => (
      <div key={information.id}>
        <Link href={`/informations/${information.id}`}>{information.title}</Link>
      </div>
    ))}
  </div>
);
export default InformationsPage;
