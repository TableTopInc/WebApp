import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemRoleComponent } from './item-role/item-role.component';

@NgModule({
  declarations: [ListRolesComponent, AddRoleComponent, ItemRoleComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    ListRolesComponent,
    AddRoleComponent,
    ItemRoleComponent
  ]
})
export class DesignerRolesModule { }
