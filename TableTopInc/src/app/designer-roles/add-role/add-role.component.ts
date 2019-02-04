import { Component, OnInit} from '@angular/core';
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

  role = {} as Roles;
  change: boolean;


  constructor(private rolesService: RolesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRole();
  }

  getRole(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.rolesService.getRole(id)
      .subscribe(role => this.role = role);
      this.change = true;
    }
    else {
      this.role = new Roles(undefined, '');
      this.change = false;
    }
  }

  onSubmit() {
    if (this.role.id === undefined) {
      this.rolesService.addRole(this.role);
    }
    else {
      this.rolesService.updateRole(this.role.id, this.role);
    }
  }

  goBack() {
    this.rolesService.goBack();
  }
}
