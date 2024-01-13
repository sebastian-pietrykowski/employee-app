import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmployeeComponent, EmployeeSearchComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    TranslateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
  ],
})
export class EmployeeModule {}
