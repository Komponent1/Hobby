import React from 'react';
import { getInformationsListPath, getInformationsProps } from '../../srcs/informations/informations.pid.local.props';
import { Information } from '../../srcs/informations/dto/informations';
import InformationsPidPage from '../../srcs/informations/informations.pid.page';

type Props = {
  information: Information;
  content: string;
};
const Informations: React.FC<Props> = ({information, content}) => (
  <InformationsPidPage information={information} content={content} />
);

export function getStaticPaths() {
  return getInformationsListPath();
}
export async function getStaticProps({params}: {params: {pid: string}}) {
  const {pid} = params;
  const props = await getInformationsProps({pid});
  return props;
}

export default Informations;
