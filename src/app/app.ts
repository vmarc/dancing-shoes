import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArduinoService } from './arduino/arduino.service';
import { ModelService } from './model/model.service';
import { AudioService } from './ui/home/audio/audio.service';
import { ToolbarComponent } from './ui/components/toolbar.component';

@Component({
  selector: 'dss-root',
  imports: [RouterOutlet, ToolbarComponent],
  template: `
    <dss-toolbar/>
    <div class="content">
      <router-outlet/>
    </div>
  `,
  styles: `
    .content {
      margin: 0 1em 1em 1em;
    }
  `,
  providers: [AudioService, ModelService, ArduinoService],
})
export class App {
}
