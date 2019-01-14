import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListGamesComponent }from './list-games/list-games.component';
import { MyGamesComponent } from './my-games.component';
import { ItemGamesComponent } from './item-games/item-games.component';

@NgModule({
  declarations: [ListGamesComponent,
    MyGamesComponent,
    ItemGamesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ListGamesComponent,
    MyGamesComponent,
    ItemGamesComponent
  ]
})
export class MyGamesModule { }
