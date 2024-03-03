import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('@/app/views/auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('@/app/views/auth/components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'forgot-password',
    title: 'Olvidó su contraseña',
    loadComponent: () =>
      import(
        '@/app/views/auth/components/forgot-password/forgot-password.component'
      ).then((c) => c.ForgotPasswordComponent),
  },
  {
    path: 'change-password',
    title: 'Cambiar su contraseña',
    loadComponent: () =>
      import(
        '@/app/views/auth/components/change-password/change-password.component'
      ).then((c) => c.ChangePasswordComponent),
  },
  {
    path: 'callback',
    title: '',
    loadComponent: () =>
      import(
        '@/app/views/auth/components/callback/callback.component'
      ).then((c) => c.CallbackComponent),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
