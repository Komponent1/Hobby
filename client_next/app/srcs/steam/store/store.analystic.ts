import {action, makeObservable, observable} from 'mobx';
import {Genre} from '../dto/steam.dto.game';

export class AnalyticStore {
  @observable tagList: string[] = [];
  @observable tagCounter: Map<string, number> = new Map();
  @observable genres: Genre[] = [];
  @observable genresCounter: Map<number, number> = new Map();

  constructor() {
    makeObservable(this);
  }

  @action
  setTagList(tagList: string[]) {
    this.tagList = tagList;
  }
  @action
  setTagCounter(tagCounter: Map<string, number>) {
    this.tagCounter = tagCounter;
  }
  @action
  setGenres(genres: Genre[]) {
    this.genres = genres;
  }
  @action
  setGenresCounter(genresCounter: Map<number, number>) {
    this.genresCounter = genresCounter;
  }
}
