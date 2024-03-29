import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LinkComponent } from '../link/link.component';
import { TraductorService } from '@/app/core/services/traductor.service';
import { Navbar } from '@/app/models/interfaces/traductor';
import { UserService } from '@/app/core/services/user.service';
import { IUser } from '@/app/models/interfaces/user';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '@/app/views/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterLink, RouterLinkActive, LinkComponent, AsyncPipe],
  providers: [UserService],
})
export class NavbarComponent implements OnInit {
  private traductor = inject(TraductorService);
  private userSvc = inject(UserService<IUser>);
  private auth = inject(AuthService);
  private router = inject(Router);
  public textos!: Navbar;
  public user!: IUser | null;

  ngOnInit(): void {
    this.traductor.textos$.subscribe(({ navbar }) => (this.textos = navbar));
    this.user = this.userSvc.getUser();
  }

  public isAdmin() {
    return this.userSvc.isAdmin();
  }

  public thumbprint() {
    const thumbprint = this.user?.thumbprint;
    if (!thumbprint) return '';
    if (thumbprint.includes('https')) return thumbprint;

    const path = thumbprint.split('/');
    path.splice(0, 5);
    return 'https://localhost:7106/' + path.join('/');
  }

  public logout() {
    this.router.navigate(['/home']);
    return this.auth.logout({ email: this.user?.email ?? '' });
  }
}
