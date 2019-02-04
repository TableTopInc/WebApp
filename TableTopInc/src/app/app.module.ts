import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyGamesModule } from './my-games/my-games.module';
import { SharedModule } from './shared/shared.module';
import { GameService } from './shared/services/game-service';
import { RolesService } from './shared/services/roles-service';
import { DesignersService } from './shared/services/designers-service';
import { ConfigService } from './shared/services/config-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { DesignerRolesModule } from './designer-roles/designer-roles.module';
import { GameDesignersModule } from './game-designers/game-designers.module';
import { ModalConfirmComponent } from './core/modal-confirm/modal-confirm.component';
import { ProgressSpinnerComponent } from './core/progress-spinner/progress-spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalConfirmComponent,
    ProgressSpinnerComponent
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
    GameDesignersModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    GameService,
    RolesService,
    DesignersService,
    ConfigService,
    ProgressSpinnerComponent
  ],
  bootstrap: [AppComponent, ProgressSpinnerComponent],
  entryComponents: [ModalConfirmComponent, ProgressSpinnerComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
