import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { routes } from '@/app/router/app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { errorResponseInterceptorFn } from '@/app/core/interceptors/error-response.interceptor';
import { tokenInterceptorFn } from '@/app/core/interceptors/token-fn.interceptor';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { OAuthModule, provideOAuthClient } from 'angular-oauth2-oidc';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorResponseInterceptorFn, tokenInterceptorFn])
    ),
    provideOAuthClient(),
    provideNoopAnimations(),
    importProvidersFrom(),
    {
      provide: LOCALE_ID,
      useValue: 'es-ES',
    },
  ],
};
