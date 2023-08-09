import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { EmployeeComponent } from './features/components/employee/employee.component';
import { EmployeeDetailComponent } from './features/components/employee-detail/employee-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: 'employee/add', component: EmployeeDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
