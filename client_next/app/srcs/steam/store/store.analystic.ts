import {action, makeObservable, observable} from 'mobx';

export class AnalyticStore {
  @observable tagList: string[] = [];
  @observable tagCounter: Map<string, number> = new Map();

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
}
