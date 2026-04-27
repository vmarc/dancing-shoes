import { Injectable } from '@angular/core';
import { Model } from './model';
import { TimeLineEvent } from './time-line-event';

@Injectable()
export class ModelService {
  private model = new Model();

  get events(): TimeLineEvent[] {
    return this.model.timeLine.events;
  }
}
