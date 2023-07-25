import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeComponent } from './features/components/employee/employee.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EmployeeDetailComponent } from './features/components/employee-detail/employee-detail.component';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, EmployeeDetailComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
