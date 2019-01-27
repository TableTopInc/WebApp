import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from '../../shared/services/roles-service';
import { Roles } from '../../shared/models/roles';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  providers: [RolesService]
})
export class AddRoleComponent implements OnInit {

  @Input() role:Roles;

  Id = '';
  Title = '';

  constructor(private rolesService:RolesService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getRole();
  }

  getRole(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.rolesService.getRole(id)
    .subscribe(role => this.role = role);
  }

  onSubmit(){
    this.rolesService.addRole(this.Id, this.Title,)
    .subscribe(() => this.goBack());  
  }

  editGame(role: Roles) {
    this.role = new Roles(role.id, role.title);
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    this.rolesService.updateRole(this.role.id, this.role).subscribe(() => this.goBack());
  }

}
