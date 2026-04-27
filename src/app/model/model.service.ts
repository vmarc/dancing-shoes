import { Injectable } from '@angular/core';
import { Model } from './model';
import { TimeLineEvent } from './time-line-event';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable()
export class ModelService {
  private httpClient = inject(HttpClient);

  private model = new Model();

  constructor() {
    this.loadEvents();
  }

  get events(): TimeLineEvent[] {
    return this.model.timeLine.events;
  }


  private loadEvents() {
    this.httpClient.get('events.txt', {responseType: 'text'}).subscribe(data => {
      const lines = data.split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          const parts = line.split('\t');
          if (parts.length >= 3) {
            const event: TimeLineEvent = {
              time: parseFloat(parts[0]),
              label: parts[2]
            };
            this.model.timeLine.events.push(event);
          }
        }
      });
    });
  }

}
