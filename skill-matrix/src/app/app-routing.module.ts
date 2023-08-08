import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { EmployeeComponent } from './features/components/employee/employee.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
