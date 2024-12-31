import type { NextApiRequest, NextApiResponse } from 'next';
import * as steamapi from '../../../srcs/steam/steam.api/steam.api.user';

const ownedGames = async (req: NextApiRequest, res: NextApiResponse) => {
  const {steamid} = req.query;
  const data = await steamapi.getOwnedGames(steamid as string);
  return res.status(200).json(data);
};

export default ownedGames;
