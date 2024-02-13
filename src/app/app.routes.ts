import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Inicio',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'auth',
    title: 'Auth',
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./pages/auth/components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () =>
          import('./pages/auth/components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'clientes',
    title: 'Clientes',
    children: [
      {
        path: '',
        title: 'Clientes',
        loadComponent: () =>
          import('./pages/clientes/clientes.component').then(
            (c) => c.ClientesComponent
          ),
      },
      {
        path: ':id',
        title: 'Cliente',
        loadComponent: () =>
          import('./pages/clientes/detail/detail.component').then(
            (c) => c.DetailComponent
          ),
      },
      // { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
  {
    path: 'facturas',
    title: 'Facturas',
    children: [
      {
        path: '',
        title: 'Facturas',
        loadComponent: () =>
          import('./pages/facturas/facturas.component').then(
            (c) => c.FacturasComponent
          ),
      },
      {
        path: ':id',
        title: 'Facturas',
        loadComponent: () =>
          import('./pages/facturas/template/template.component').then(
            (c) => c.TemplateComponent
          ),
      },
      // { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    loadComponent: () =>
      import('./pages/users/users.component').then((c) => c.UsersComponent),
  },
  {
    path: '404',
    title: '404',
    loadComponent: () =>
      import('./pages/error/error.component').then((c) => c.ErrorComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];
