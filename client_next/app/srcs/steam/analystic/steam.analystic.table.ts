import { GameData, GameTable } from "../dto/steam.dto.game";
import { RATING_TEXT } from "../steam.constant";
import { dateWithZero } from "../utils/steam.util.time";

const priceCut = (price: number | undefined) => {
  if (!price) return 'Free';
  return `${price / 100} \u20A9`;
};
const timeToHour = (min: number | undefined) => {
  if (!min || min === 0) return `-`;
  return `${(min / 60).toFixed(1)}H`;
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
  playtime: { type: 'text', value: timeToHour(data.personal_data.playtime_forever) },
  price: { type: 'text', value: data.system_data.price_overview?.final_formatted || priceCut(data.system_data.price_overview?.final) },
  releaseDate: { type: 'text', value: dateToText(data.system_data.release_date)},
  rating: { type: 'text', value: ratingText(data.crawling_data?.rating)},
}));
