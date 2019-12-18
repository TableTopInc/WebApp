import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ButtonComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
  ],
})

export class CoreModule { }
