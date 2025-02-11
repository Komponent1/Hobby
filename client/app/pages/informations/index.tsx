import React from 'react';
import { getInformationsPropsFromLoacl } from '../../srcs/informations/informations.local.props';
import { InformationList } from "../../srcs/informations/dto/informations";
import InformationsContainer from "../../srcs/informations/informations.container";

type Props = {
  informations: InformationList[];
};
const Informations: React.FC<Props> = ({informations}) => (
  <InformationsContainer informations={informations} />
);

export default Informations;

export async function getServerSideProps() {
  return getInformationsPropsFromLoacl();
}
