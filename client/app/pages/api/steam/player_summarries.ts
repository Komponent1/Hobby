import {NextApiRequest, NextApiResponse} from 'next';
import * as steamapi from '../../../srcs/steam/steam.api/steam.api.user';

const playerSummaries = async (req: NextApiRequest, res: NextApiResponse) => {
  const {steamid} = req.query;
  const data = await steamapi.getPlayerSummaries(steamid as string);
  return res.status(200).json(data);
};

export default playerSummaries;
