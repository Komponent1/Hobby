export type OwnedGames = {
  appid: number;
  playtime_2weeks: number;
  playtime_forever: number;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: number;
  playtime_disconnected: number;
};
export type GetOwnedGamesResponse = {
  response: {
    games: OwnedGames[];
  };
};
export type PlayerSummary = {
  avatar: string;
  avatarfull: string;
  avatarhash: string;
  avatarmedium: string;
  communityvisibilitystate: number;
  lastlogoff: number;
  personaname: string;
  personastate: number;
  personastateflags: number;
  primaryclanid: string;
  profilestate: number;
  profileurl: string;
  steanid: string;
  timecreated: number;
};
export type GameDetail = {
  about_the_game: string;
  achievements: {
    total: number;
    highlighted: {name: string; path: string}[];
  };
  background: string;
  background_raw: string;
  capsule_image: string;
  capsule_imagev5: string;
  categories: {id: number; description: string}[];
  content_descriptors: {ids: number[]; notes: string};
  controller_support: string;
  detailed_description: string;
  developers: string[];
  dlc: number[];
  genres: {id: number; description: string}[];
  header_image: string;
  is_free: boolean;
  legal_notice: string;
  linux_requirements: {minimum: string; recommended: string};
  mac_requirements: {minimum: string; recommended: string};
  metacritic: {score: number; url: string};
  movies: {id: number; name: string; thumbnail: string}[];
  name: string;
  packages: number[];
  pc_requirements: {minimum: string; recommended: string};
  platforms: {windows: boolean; mac: boolean; linux: boolean};
  price_overview: {
    currency: string;
    final: number;
    initial: number;
    discount_percent: number;
  };
  publishers: string[];
  recommendations: {total: number};
  release_date: {coming_soon: boolean; date: string};
  required_age: number;
  reviews: string;
  screenshots: {id: number; path_thumbnail: string; path_full: string}[];
  short_description: string;
  steam_appid: number;
  support_info: {url: string; email: string};
  supported_languages: string;
  type: string;
  website: string;
};
export type GameDetailResponse = {
  [appid: string]: {
    data: GameDetail;
    success: boolean;
  };
};
