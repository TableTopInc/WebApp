import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  buttons: Array<{}> = [
    {value: 'Games',  url: ''},
    {value: 'Game designer roles',  url: '/designerRoles'},
    {value: 'Game designers', url: '/gameDesigners'}];

  constructor() { }

  ngOnInit() {
  }

  btnHandler(e) {

  }

}
