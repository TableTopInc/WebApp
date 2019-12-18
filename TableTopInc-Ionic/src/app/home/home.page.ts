import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
import { Platform } from '@ionic/angular';
import { LoginService } from '../shared/services/login-service';
import { ElectronAuthService } from '../shared/services/electronAuth-service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user: any;
  loggedIn: boolean = false;
  

  constructor(
    private fb: Facebook,
    private authService: AuthService,
    public platform: Platform,
    public loginService: LoginService,
    public electronAuth: ElectronAuthService,
    ) {
    this.loginService.onClick.subscribe(l => this.loggedIn = l);

    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if (res.status === 'connect') {
        this.loginService.doLogin(true);
      } else {
        this.loginService.doLogin(false)
      }
    })
    .catch(e => console.log(e));
  }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  login() {
    if(this.platform.is('android')) {
      this.androidLogin();
      console.log("ANDROID")
    }
    else if(this.platform.is('electron')) {
      this.electronLogin();
      console.log("ELECTRON")
    }
    else {
      this.webLogin();
      console.log("WWWWWEEEEBBB")
    }
  }

  logout() {
    if(this.platform.is('android')) {
      this.androidLogout();
    }
    else if(this.platform.is('electron')) {
      this.androidLogout();
    }
    else {
      this.webLogout();
    }
  }

  webLogin(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  webLogout(): void {
    this.authService.signOut();
  }

  electronLogin() {
    this.electronAuth.signIn();
  }

  androidLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.loginService.doLogin(true)
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.loginService.doLogin(false)
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        this.user = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  androidLogout() {
    this.fb.logout()
      .then( res => {this.loginService.doLogin(false);})
      .catch(e => console.log('Error logout from Facebook', e));
  }

}
