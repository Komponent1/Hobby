export const num2wonComma = (num: number): string => `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} \u20A9`;
export const hourCut = (hour: number): string => `${hour.toFixed(1)}H`;
