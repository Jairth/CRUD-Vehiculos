import type { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import('./ui/layout/layout.component'),
    children: [
      {
        path: 'list-cars',
        loadComponent: () => import('./features/product-list/product-list.component')
      },
      {
        path: 'list-clients',
        loadComponent: () => import('./list-clients/list-clients/list-clients.component')
      },
      {
        path: 'list-staff',
        loadComponent: () => import('./staff/list-staff/list-staff.component')
      },
      {
        path: 'rents',
        loadComponent: () => import('./rents/list-rent/list-rent.component')
      },
      {
        path: 'payments',
        loadComponent: () => import('./payments/payments.component')
      },
      {
        path: 'reports',
        loadComponent: () => import('./report-charts/report-charts.component')
      },
      {
        path: '**',
        redirectTo: 'list-cars'
      }
    ]
  }
] as Routes
