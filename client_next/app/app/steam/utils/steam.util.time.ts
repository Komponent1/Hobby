export const timecode2Time = (timecode: number): {day: number, hour: number, min: number} => {
  const day = Math.floor(timecode / 24 / 60);
  const hour = Math.floor(timecode / 60) % 24;
  const min = timecode % 60;
  return {day, hour, min};
};
export const dateWithZero = (date: number | string): string => {
  if (typeof date === 'string') {
    const num = parseInt(date, 10);
    return num < 10 ? `0${num}` : `${num}`;
  }
  return date < 10 ? `0${date}` : `${date}`;
};
