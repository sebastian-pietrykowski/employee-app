import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MessagesComponent } from './messages/messages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [NavbarComponent, MessagesComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatBadgeModule,
    MatCardModule,
    MatMenuModule,
    RouterLink,
    MatTooltipModule,
  ],
  exports: [NavbarComponent],
})
export class NavigationModule {}
