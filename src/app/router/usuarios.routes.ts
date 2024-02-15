import { Routes } from '@angular/router';

export const usuariosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/app/views/users/users.component').then((c) => c.UsersComponent),
  },
];
