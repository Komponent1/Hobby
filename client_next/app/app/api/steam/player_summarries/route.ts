import url from 'url';
import * as steamapi from '../../../steam/steam.api/steam.api.user';

export const GET = async (req: Request) => {
  const {steamid} = url.parse(req.url, true).query;
  const data = await steamapi.getPlayerSummaries(steamid as string);
  return new Response(JSON.stringify(data), {status: 200});
};
