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
import { HttpClient } from '@angular/common/http';
import {
  TranslateService,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
//     provideClientHydration(
//       withHttpTransferCacheOptions({
//         includePostRequests: true,
//       })
//     ),
//     provideHttpClient(
//       withFetch(),
//       withInterceptors([errorResponseInterceptorFn, tokenInterceptorFn])
//     ),
//     provideNoopAnimations(),
//   ],
// };
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    TranslateService,
  ],
};
