import { ApplicationConfig, importProvidersFrom } from '@angular/core';
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
    provideNoopAnimations(),
    importProvidersFrom(),
  ],
};
