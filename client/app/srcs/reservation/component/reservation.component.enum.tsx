export enum PannelType {
  RESERVATION = 'reservation',
  STAFF = 'staff',
  SERVICE = 'service',
}
export const PannelIconMatch = {
  [PannelType.RESERVATION]: 'calendar_plus_fill',
  [PannelType.STAFF]: 'people_fill',
  [PannelType.SERVICE]: 'cart4',
};
export const PannelTextMatch = {
  [PannelType.RESERVATION]: '예약 관리',
  [PannelType.STAFF]: '직원 관리',
  [PannelType.SERVICE]: '서비스 관리',
};
