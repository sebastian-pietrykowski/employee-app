import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { ROUTE_PATHS } from './config/route-paths';

const routes: Routes = [
  { path: '', redirectTo: ROUTE_PATHS.DASHBOARD, pathMatch: 'full' },
  {
    path: ROUTE_PATHS.LOGIN,
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.EMPLOYEES,
    loadChildren: () =>
      import('./features/employee/employee.module').then(
        (m) => m.EmployeeModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.ADD_EMPLOYEE,
    loadChildren: () =>
      import('./features/employee-detail/employee-detail.module').then(
        (m) => m.EmployeeDetailModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.SHOW_EMPLOYEE + '/:id',
    loadChildren: () =>
      import('./features/employee-detail/employee-detail.module').then(
        (m) => m.EmployeeDetailModule,
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
