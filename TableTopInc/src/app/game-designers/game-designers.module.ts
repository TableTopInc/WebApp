import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }   from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListDesignersComponent } from './list-designers/list-designers.component';
import { ItemDesignerComponent } from './item-designer/item-designer.component';
import { AddDesignerComponent } from './add-designer/add-designer.component';


@NgModule({
  declarations: [
    ListDesignersComponent,
    ItemDesignerComponent,
    AddDesignerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ListDesignersComponent,
    ItemDesignerComponent,
    AddDesignerComponent
  ]
})
export class GameDesignersModule { }
