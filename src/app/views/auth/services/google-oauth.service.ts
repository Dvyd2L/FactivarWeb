import { environment } from '@/environments/environment.development';
import { Injectable, afterRender, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class GoogleOauthService {
  private readonly oauth = inject(OAuthService);

  constructor() {
    afterRender(() => this.oauth.setStorage(localStorage));
    this.initLogin();
  }

  public initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.googleOauth2.client_id,
      redirectUri: environment.googleOauth2.redirect_uris[0],
      scope: 'openid profile email',
    };

    this.oauth.configure(config);
    this.oauth.setupAutomaticSilentRefresh();
    this.oauth.loadDiscoveryDocumentAndTryLogin();
  }

  public login() {
    this.oauth.initLoginFlow();
  }

  public logout() {
    this.oauth.logOut();
  }

  public getProfile() {
    return this.oauth.getIdentityClaims();
  }

  public getIdToken() {
    return this.oauth.getIdToken();
  }
}
