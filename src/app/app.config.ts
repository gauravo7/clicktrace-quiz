import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
     // 3. Initialize Firebase and Firestore
    provideFirebaseApp(() => initializeApp({
      apiKey: 'AIzaSyAGO9DrZie1NTHAznizXoVqm9PsnOY-i90',
      authDomain: 'clicksrace.firebaseapp.com',
      databaseURL: 'https://clicksrace-default-rtdb.firebaseio.com',
      projectId: 'clicksrace',
      storageBucket: 'clicksrace.firebasestorage.app',
      messagingSenderId: '710637413847',
      appId: '1:710637413847:web:986ed4197b1ccbd42f5792',
      measurementId: 'G-5DLP28WPCF',
    })),
    provideDatabase(() => getDatabase()),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
};
