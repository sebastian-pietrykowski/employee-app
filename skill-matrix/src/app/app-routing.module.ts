import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ROUTE_PATHS } from './route-paths';

const routes: Routes = [
  { path: '', redirectTo: ROUTE_PATHS.DASHBOARD, pathMatch: 'full' },
  {
    path: ROUTE_PATHS.DASHBOARD,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
  },
  {
    path: ROUTE_PATHS.EMPLOYEES,
    loadChildren: () =>
      import('./features/employee/employee.module').then(
        (m) => m.EmployeeModule,
      ),
  },
  {
    path: ROUTE_PATHS.ADD_EMPLOYEE,
    loadChildren: () =>
      import('./features/employee-detail/employee-detail.module').then(
        (m) => m.EmployeeDetailModule,
      ),
    data: { behavior: 'add' },
  },
  {
    path: ROUTE_PATHS.SHOW_EMPLOYEE + '/:id',
    loadChildren: () =>
      import('./features/employee-detail/employee-detail.module').then(
        (m) => m.EmployeeDetailModule,
      ),
    data: { behavior: 'load' },
  },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
