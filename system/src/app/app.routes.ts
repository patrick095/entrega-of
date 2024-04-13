import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/base/base.component').then((c) => c.BaseComponent),
        children: [
            {
                path: 'dash',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./pages/settings/settings.component').then((c) => c.SettingsComponent)
            },
            {
                path: 'tasks',
                loadComponent: () => import('./pages/tasks/tasks.component').then((c) => c.TasksComponent)
            },
            {
                path: '**',
                redirectTo: 'dash'
            }
        ]
    }
];
