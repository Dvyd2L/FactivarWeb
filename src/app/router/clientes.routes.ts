import { Routes } from '@angular/router';

export const clientesRoutes: Routes = [
  {
    path: '',
    title: 'Clientes',
    loadComponent: () =>
      import('@/app/views/clientes/clientes.component').then(
        (c) => c.ClientesComponent
      ),
  },
  {
    path: ':id',
    title: 'Cliente',
    loadComponent: () =>
      import('@/app/views/clientes/detail/detail.component').then(
        (c) => c.DetailComponent
      ),
  },
  // { path: '', redirectTo: 'overview', pathMatch: 'full' },
];
