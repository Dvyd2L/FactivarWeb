import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
];
