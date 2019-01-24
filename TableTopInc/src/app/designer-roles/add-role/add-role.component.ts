import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../shared/services/roles-service';
import { Roles } from '../../shared/models/roles';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  providers: [RolesService]
})
export class AddRoleComponent implements OnInit {

  role:Roles;

  Id = '';
  Title = '';

  constructor(private rolesService:RolesService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getRole();
  }

  // getRole(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.rolesService.getRole(id)
  //   .subscribe(role => this.role = role);
  // }
  onSubmit() {
   
    this.rolesService.addRole(this.Id, this.Title);
  }

}
