import { Routes } from '@angular/router';
import { authGuard } from '@/app/router/guards/auth.guard';
import { adminGuard } from '@/app/router/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Inicio',
    loadComponent: () =>
      import('@/app/views/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'auth',
    title: 'Auth',
    loadChildren: () =>
      import('@/app/router/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'clientes',
    title: 'Clientes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@/app/views/layout/layout.component').then((c) => c.LayoutComponent),
    loadChildren: () =>
      import('@/app/router/clientes.routes').then((m) => m.clientesRoutes),
  },
  {
    path: 'facturas',
    title: 'Facturas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@/app/views/layout/layout.component').then((c) => c.LayoutComponent),
    loadChildren: () =>
      import('@/app/router/facturas.routes').then((m) => m.facturasRoutes),
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('@/app/views/layout/layout.component').then((c) => c.LayoutComponent),
    loadChildren: () =>
      import('@/app/router/usuarios.routes').then((m) => m.usuariosRoutes),
  },
  {
    path: '404',
    title: '404',
    loadComponent: () =>
      import('@/app/views/error/error.component').then((c) => c.ErrorComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];
