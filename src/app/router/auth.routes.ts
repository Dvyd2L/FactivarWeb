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
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ]