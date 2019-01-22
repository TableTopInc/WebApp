import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGameComponent } from './my-games/add-game/add-game.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { ItemGameComponent } from './my-games/item-game/item-game.component';
import { ListRolesComponent } from './designer-roles/list-roles/list-roles.component';
import { AddRoleComponent } from './designer-roles/add-role/add-role.component';
import { ItemRoleComponent } from './designer-roles/item-role/item-role.component';

const routes: Routes = [
  { path: '', component: MyGamesComponent },
  { path: 'add', component: AddGameComponent },
  { path: 'item/:id', component: ItemGameComponent },
  { path: 'edit/:id', component: AddGameComponent },
  { path: 'designerRoles', component: ListRolesComponent },
  { path: 'addDesignerRoles', component: AddRoleComponent },
  { path: 'editDesignerRoles/:id', component: AddRoleComponent },
  { path: 'itemDesignerRoles/:id', component: ItemRoleComponent },
  { path: '**',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
