import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideHttpClient } from '@angular/common/http';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { AudioService } from './ui/home/audio/audio.service';
import { ModelService } from './model/model.service';
import { ArduinoService } from './arduino/arduino.service';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideNzI18n(en_US),
    provideHttpClient(),
    ArduinoService,
    AudioService,
    ModelService,
  ]
};

