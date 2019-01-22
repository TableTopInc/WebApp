import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyGamesModule } from './my-games/my-games.module';
import { SharedModule } from './shared/shared.module';
import { GameService } from './shared/services/game-service';
import { RolesService } from './shared/services/roles-service';
import { DesignersService } from './shared/services/designers-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { DesignerRolesModule } from './designer-roles/designer-roles.module';
import { GameDesignersModule } from './game-designers/game-designers.module';




@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyGamesModule,
    SharedModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    CoreModule,
    DesignerRolesModule,
    GameDesignersModule
  ],
  providers: [
    GameService,  
    RolesService, 
    DesignersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
