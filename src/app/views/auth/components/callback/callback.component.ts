import { StorageService } from '@/app/core/services/storage.service';
import { UserService } from '@/app/core/services/user.service';
import { RolesEnum } from '@/app/models/enums/roles.enum';
import { StorageKeyEnum } from '@/app/models/enums/storage.enum';
import { IUser } from '@/app/models/interfaces/user';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly storage = inject(StorageService);
  private readonly userSvc = inject(UserService<IUser>);

  ngOnInit(): void {
    this.getUrl();
  }

  private getUrl() {
    const currentUrl = this.router.url;
    const token = currentUrl.split('id_token=')[1];
    const jwtHelper = new JwtHelperService();
    const payload = jwtHelper.decodeToken(token);
    this.storage.set(StorageKeyEnum.Token, token);
    this.userSvc.updateUser({
      role: RolesEnum.User,
      sid: crypto.randomUUID(),
      token,
      aud: payload.aud,
      email: payload.email,
      exp: payload.exp,
      iss: payload.iss,
      name: payload.given_name,
      thumbprint: payload.picture,
      surname: payload.family_name,
    });
    this.auth.loginWithGoogle(token).subscribe((res) => console.log(res));
    this.router.navigate(['/']);
  }
}
