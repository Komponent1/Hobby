import informationsJson from '../../informations/informations.json';

export function getInformationsPropsFromLoacl() {
  const informations = informationsJson;

  return ({
    props: {
      informations,
    },
  });
}
