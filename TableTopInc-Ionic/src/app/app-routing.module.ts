import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddGameComponent } from './my-games/add-game/add-game.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { ItemGameComponent } from './my-games/item-game/item-game.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage},
  { path: 'games', component: MyGamesComponent },
  { path: 'add', component: AddGameComponent },
  { path: 'item/:id', component: ItemGameComponent },
  { path: 'edit/:id', component: AddGameComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
