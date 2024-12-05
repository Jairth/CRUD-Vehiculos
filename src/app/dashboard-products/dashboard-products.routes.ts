import { Routes } from "@angular/router";

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
        path: '**',
        redirectTo: 'list-cars'
      }
    ]
  }
] as Routes
