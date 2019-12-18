import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  buttons: Array<{}> = [
    {value: 'Home',  url: '/home'},
    {value: 'Games',  url: '/games'},
    {value: 'Game designer roles',  url: '/designerRoles'},
    {value: 'Game designers', url: '/gameDesigners'},
    {value: 'Tag', url: '/tags'}];

  constructor() { }

  ngOnInit() {
  }

  btnHandler(e) {

  }

}
