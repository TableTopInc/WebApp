import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Platform } from '@ionic/angular';

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
    public platform: Platform
    ) {
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if (res.status === 'connect') {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
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
      this.webLogin();
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
      console.log("ANDROID")
    }
    else if(this.platform.is('electron')) {
      this.webLogout();
      console.log("ELECTRON")
    }
    else {
      this.webLogout();
      console.log("WWWWWEEEEBBB")
    }
  }

  webLogin(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  webLogout(): void {
    this.authService.signOut();
  }

  androidLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.loggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.loggedIn = false;
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
      .then( res => this.loggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

}
