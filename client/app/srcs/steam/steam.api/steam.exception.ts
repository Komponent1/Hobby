/* eslint-disable max-classes-per-file */
/**
 * PlayerSummaries 가져오기 실패(web api)
 */
export class GetPlayerSummariesException extends Error {
  constructor() {
    super('GetPlayerSummariesException');
    this.name = 'GetPlayerSummariesException';
  }
}
/**
 * OwnedGames 가져오기 실패(web api)
 */
export class GetOwnedGamesException extends Error {
  constructor() {
    super('GetOwnedGamesException');
    this.name = 'GetOwnedGamesException';
  }
}
/**
 * appid로 게임 정보 가져오기 실패(store api)
 */
export class GetAppInformationException extends Error {
  constructor() {
    super('GetAppInformationException');
    this.name = 'GetAppInformationException';
  }
}
export class GetAppInformationsException extends Error {
  constructor() {
    super('GetAppInformationsException');
    this.name = 'GetAppInformationsException';
  }
}
/**
 * Store HTML에서 TagParsing 실패(store html crawling)
 */
export class TagParsingException extends Error {
  constructor() {
    super('TagParsingException');
    this.name = 'TagParsingException';
  }
}
/**
 * 게임 HTML 가져오기 실패(store html crawling)
 */
export class GetStoreHtmlException extends Error {
  constructor() {
    super('GetStoreHtmlException');
    this.name = 'GetStoreHtmlException';
  }
}
