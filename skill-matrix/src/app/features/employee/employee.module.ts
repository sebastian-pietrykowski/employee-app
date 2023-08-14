import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    TranslateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class EmployeeModule {}
