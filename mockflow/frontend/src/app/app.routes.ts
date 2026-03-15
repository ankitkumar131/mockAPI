import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'projects/new',
    loadComponent: () =>
      import('./features/project-create/project-create').then(
        (m) => m.ProjectCreate
      ),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/project-detail/project-detail').then(
        (m) => m.ProjectDetail
      ),
  },
  {
    path: 'projects/:slug/playground',
    loadComponent: () =>
      import('./features/playground/playground').then((m) => m.Playground),
  },
  {
    path: 'projects/:slug/analytics',
    loadComponent: () =>
      import('./features/analytics/analytics').then((m) => m.Analytics),
  },
];
