import { CommonModule } from '@angular/common';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeDetailRoutingModule } from './employee-detail-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [
    CommonModule,
    EmployeeDetailRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    TranslateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class EmployeeDetailModule {}
