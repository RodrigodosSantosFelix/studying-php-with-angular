/*
* O main é o ponto de entrada usado pelo angular para inicar e inicializar o app
*/

import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
