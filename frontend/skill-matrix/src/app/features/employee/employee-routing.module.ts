import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: EmployeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
