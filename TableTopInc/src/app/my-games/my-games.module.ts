import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListGamesComponent } from './list-games/list-games.component';
import { MyGamesComponent } from './my-games.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ItemGameComponent } from './item-game/item-game.component';


@NgModule({
  declarations: [ListGamesComponent,
    MyGamesComponent,
    AddGameComponent,
    ItemGameComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ListGamesComponent,
    MyGamesComponent,
    ItemGameComponent,
    AddGameComponent,
  ]
})
export class MyGamesModule { }
