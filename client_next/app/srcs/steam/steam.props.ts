import fs from 'fs';

export const saveJsonInCrawling = async (steamid: string, gameinfos: any) => {
  fs.writeFileSync(`${steamid}.json`, JSON.stringify(gameinfos, null, 2));
};
export const loadJsonGameData = async (steamid: string) => {
  const data = fs.readFileSync(`${steamid}.json`, 'utf8');
  return JSON.parse(data);
};

export async function getSteamProps() {
  try {
    return ({
      props: {},
    });
  } catch (err) {
    return ({
      redirect: {
        destination: '/error',
        permanent: false,
      },
    });
  }
}
