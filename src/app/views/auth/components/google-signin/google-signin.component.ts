import { GoogleOauthService } from '@/app/views/auth/services/google-oauth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.scss',
  providers: [],
})
export class GoogleSigninComponent {
  private readonly gOauth = inject(GoogleOauthService);

  public async loginWithGoogle() {
    this.gOauth.login();
  }
}
