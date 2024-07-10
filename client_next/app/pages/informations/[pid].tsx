import React from 'react';
import { getInformationsListPath, getInformationsProps } from '../../srcs/pages/informations/informations.pid.local.props';

type Props = {
  information: string;
};
const Informations: React.FC<Props> = ({information}) => (
  <div>
    <h1>Informations</h1>
    <div dangerouslySetInnerHTML={{__html: information}} />
  </div>
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
