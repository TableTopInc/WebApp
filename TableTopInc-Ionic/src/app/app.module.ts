import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Facebook } from '@ionic-native/facebook/ngx';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { CoreModule } from './core/core.module';
import { HomePage } from './home/home.page';
import { SharedModule } from './shared/shared.module';
import { MyGamesModule } from './my-games/my-games.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingService } from './shared/services/loading-service';
import { GameService } from './shared/services/game-service';
import { RolesService } from './shared/services/roles-service';
import { DesignersService } from './shared/services/designers-service';
import { ConfigService } from './shared/services/config-service';
import { TagsService } from './shared/services/tags-service';
import { LoginService } from './shared/services/login-service';
import { ElectronAuthService } from './shared/services/electronAuth-service';
import { MatDialogModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalConfirmComponent } from './core/modal-confirm/modal-confirm.component';
import { NgxElectronModule } from 'ngx-electron';


const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('544808789702654')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ModalConfirmComponent
  ],
  entryComponents: [ModalConfirmComponent,],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocialLoginModule,
    CoreModule,
    SharedModule,
    MyGamesModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    NgSelectModule,
    NgxElectronModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    GameService,
    RolesService,
    DesignersService,
    ConfigService,
    TagsService,
    LoadingService,
    LoginService,
    ElectronAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
