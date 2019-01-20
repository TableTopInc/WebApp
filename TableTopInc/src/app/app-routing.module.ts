import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGameComponent } from './my-games/add-game/add-game.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { ItemGameComponent } from './my-games/item-game/item-game.component';

const routes: Routes = [
  { path: '', component: MyGamesComponent },
  { path: 'add', component: AddGameComponent },
  { path: 'item/:id', component: ItemGameComponent },
  { path: 'edit/:id', component: AddGameComponent },
  { path: '**',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
