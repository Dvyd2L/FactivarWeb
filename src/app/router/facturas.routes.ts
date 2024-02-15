import { Routes } from '@angular/router';

export const facturasRoutes: Routes = [
  {
    path: '',
    title: 'Facturas',
    loadComponent: () =>
      import('@/app/views/facturas/facturas.component').then(
        (c) => c.FacturasComponent
      ),
  },
  {
    path: ':id',
    title: 'Facturas',
    loadComponent: () =>
      import('@/app/views/facturas/template/template.component').then(
        (c) => c.TemplateComponent
      ),
  },
  // { path: '', redirectTo: 'overview', pathMatch: 'full' },
];
