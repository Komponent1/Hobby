import informationsJson from './posts/informations.json';

export function getInformationsListPath() {
  const informationsPaths = informationsJson.map((information) => ({
    params: {
      pid: String(information.id),
    },
  }));

  return {
    paths: informationsPaths,
    fallback: false,
  };
}
type Property = {
  pid: string;
};
export async function getInformationsProps({pid}: Property) {
  return {
    props: {
      informations: pid,
    },
  };
}
