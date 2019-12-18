import {Injectable, EventEmitter} from '@angular/core';


@Injectable({ providedIn: 'root'})
export class LoginService {

public isLogin:boolean = false;
onClick:EventEmitter<boolean> = new EventEmitter();

    constructor() {}

    public doLogin(logIn:boolean){
        this.isLogin = logIn;
        this.onClick.emit(this.isLogin);
      }
}
