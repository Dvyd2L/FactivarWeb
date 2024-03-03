import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.getUrl();
  }

  private getUrl() {
    const currentUrl = this.router.url;
    const token = currentUrl?.split('id_token=')[1]?.split('&')[0];
    this.auth.loginWithGoogle(token).subscribe();
    this.router.navigate(['/']);
  }
}
