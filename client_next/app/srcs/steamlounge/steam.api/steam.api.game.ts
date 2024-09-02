import axios from 'axios';
import { STORE_URL } from './steam.api.constant';
import { GetAppInformationException, GetAppInformationsException } from './steam.exception';

/**
 * 게임 정보 가져오기
 * @param appid 게임 아이디
 * @returns
 */
export const getAppInformation = async (appid: string) => {
  try {
    const res = await axios.get(
      `${STORE_URL}/appdetails?appids=${appid}`,
    );
    return res.data;
  } catch (err) {
    throw new GetAppInformationException();
  }
};
export const getAppInformations = async (appids: string[]) => {
  try {
    const res = await axios.get(
      `${STORE_URL}/appdetails?appids=${appids.join(',')}`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw new GetAppInformationsException();
  }
};
