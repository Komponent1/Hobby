import informationsJson from './posts/informations.json';

export function getInformationsPropsFromLoacl() {
  const informations = informationsJson;

  return ({
    props: {
      informations,
    },
  });
}
