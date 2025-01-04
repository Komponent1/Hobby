import {action, observable} from 'mobx';

export class AnalyticStore {
  @observable tagList: string[] = [];
  @observable tagCounter: Map<string, number> = new Map();

  @action
  setTagList(tagList: string[]) {
    this.tagList = tagList;
  }
  @action
  setTagCounter(tagCounter: Map<string, number>) {
    this.tagCounter = tagCounter;
  }
}
