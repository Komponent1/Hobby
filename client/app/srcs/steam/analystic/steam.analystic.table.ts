import { GameData, GameTable } from "../dto/steam.dto.game";
import { RATING_TEXT } from "../steam.constant";
import { hourCut, num2wonComma } from "../utils/steam.util.string";
import { dateWithZero } from "../utils/steam.util.time";

const priceCut = (price: number | undefined) => {
  if (!price) return 'Free';
  return num2wonComma(price / 100);
};
const timeToHour = (min: number | undefined) => {
  if (!min || min === 0) return '-';
  return hourCut(min / 60);
};
const dateToText = (release_date: {coming_soon: boolean; date: string} | undefined) => {
  if (!release_date) return '-';
  if (release_date.coming_soon) return 'Comming Soon';
  const dateProcess = release_date.date.split(' ');
  if (dateProcess.length !== 3) {
    return '-';
  }
  const change = (mon: string) => {
    switch (mon) {
      case 'Jan,': return '1';
      case 'Feb,': return '2';
      case 'Mar,': return '3';
      case 'Apr,': return '4';
      case 'May,': return '5';
      case 'Jun,': return '6';
      case 'Jul,': return '7';
      case 'Aug,': return '8';
      case 'Sep,': return '9';
      case 'Oct,': return '10';
      case 'Nov,': return '11';
      case 'Dec,': return '12';
      default: return '';
    }
  };

  return `${dateWithZero(dateProcess[2].slice(2))}.${dateWithZero(change(dateProcess[1]))}.${dateWithZero(dateProcess[0])}`;
};
const ratingText = (rating: string | undefined) => {
  if (!rating) return '-';
  const text = RATING_TEXT[rating as keyof typeof RATING_TEXT];
  if (!text) return '-';
  return text;
};
export const genTable = (gameDatas: GameData[]): GameTable[] => gameDatas.map((data) => ({
  photoUrl: { type: 'image', value: data.system_data.capsule_image || '' },
  name: { type: 'text', value: data.system_data.name },
  playtime: { type: 'text', value: timeToHour(data.personal_data.playtime_forever), sort: data.personal_data.playtime_forever ? data.personal_data.playtime_forever : 0 },
  price: { type: 'text', value: priceCut(data.system_data.price_overview?.final), sort: data.system_data.price_overview?.final ? data.system_data.price_overview?.final : 0 },
  releaseDate: { type: 'text', value: dateToText(data.system_data.release_date), sort: data.system_data.release_date?.date ? new Date(data.system_data.release_date.date).getTime() : 0 },
  rating: { type: 'text', value: ratingText(data.crawling_data?.rating)},
}));
