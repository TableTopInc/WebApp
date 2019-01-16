import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }   from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListGamesComponent }from './list-games/list-games.component';
import { MyGamesComponent } from './my-games.component';
import { AddGameComponent } from './add-game/add-game.component';

@NgModule({
  declarations: [ListGamesComponent,
    MyGamesComponent,
    AddGameComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[ListGamesComponent,
    MyGamesComponent,
  ]
})
export class MyGamesModule { }
