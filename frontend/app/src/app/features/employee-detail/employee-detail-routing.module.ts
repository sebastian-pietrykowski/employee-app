import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: EmployeeDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDetailRoutingModule {}
