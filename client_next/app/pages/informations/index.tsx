import React from 'react';
import Link from 'next/link';
import { getInformationsPropsFromLoacl } from '../../srcs/informations/informations.local.props';
import { Information } from "../../srcs/informations/dto/informations";

type Props = {
  informations: Information[];
};
const Informations: React.FC<Props> = ({informations}) => (
  <div>
    <h1>Informations</h1>
    {informations.map((information) => (
      <div key={information.id}>
        <Link href={`/informations/${information.id}`}>{information.title}</Link>
      </div>
    ))}
  </div>
);

export default Informations;

export async function getServerSideProps() {
  return getInformationsPropsFromLoacl();
}
