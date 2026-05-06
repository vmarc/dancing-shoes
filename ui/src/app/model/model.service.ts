import { Injectable } from '@angular/core';
import { Model } from './model';
import { TimeLineEvent } from './time-line-event';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable()
export class ModelService {
  private httpClient = inject(HttpClient);

  readonly model = new Model();

  constructor() {
    this.loadEvents();
  }

  private loadEvents() {
    this.loadEventsIn(this.model.timeLine.eventsLeft, 'left.txt');
    this.loadEventsIn(this.model.timeLine.eventsRight, 'right.txt');
  }

  private loadEventsIn(events: TimeLineEvent[], url: string): void {
    this.httpClient.get(url, {responseType: 'text'}).subscribe(data => {
      const lines = data.split('\n');
      lines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 3) {
          const event: TimeLineEvent = {
            time1: parseFloat(parts[0]),
            time2: parseFloat(parts[1]),
            label: parts[2]
          };
          events.push(event);
        }
      });
    });
  }
}
