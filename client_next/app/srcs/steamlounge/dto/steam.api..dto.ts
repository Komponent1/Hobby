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
