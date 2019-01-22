import { Component, OnInit } from '@angular/core';

import { Roles } from '../../shared/models/roles';
import { RolesService } from '../../shared/services/roles-service';


@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss'],
  providers: [RolesService]
})
export class ListRolesComponent implements OnInit {

  roles:Roles[];

  constructor(private rolesService:RolesService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles():void{
   this.rolesService.getRoles()
     .subscribe(roles => this.roles = roles);
  }

  onDelete(roles: Roles) {
    this.rolesService.deleteGame(roles);
  }
}
