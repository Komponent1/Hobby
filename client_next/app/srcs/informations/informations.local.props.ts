import informationsJson from './posts/informations.json';

export function getInformationsPropsFromLoacl() {
  const informations = Object.values(informationsJson);

  return ({
    props: {
      informations,
    },
  });
}
