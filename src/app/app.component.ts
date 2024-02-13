import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FactivarWeb';
  /**
   * Verifica si la ruta actual es la página de inicio.
   * @returns `true` si la ruta actual es '/home', de lo contrario `false`.
   */
  public isHome() {
    return window.location.pathname === '/home';
  }
  /**
   * Verifica si la ruta actual es la página de inicio de sesión.
   * @returns `true` si la ruta actual es '/login', de lo contrario `false`.
   */
  public isLogin() {
    return window.location.pathname === '/auth/login';
  }
  /**
   * Verifica si la ruta actual es la página de registro.
   * @returns `true` si la ruta actual es '/register', de lo contrario `false`.
   */
  public isRegister() {
    return window.location.pathname === '/auth/register';
  }
}
