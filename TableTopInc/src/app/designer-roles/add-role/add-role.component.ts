import { Component, OnInit} from '@angular/core';
import { RolesService } from '../../shared/services/roles-service';
import { Roles } from '../../shared/models/roles';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {

  role = {} as Roles;
  roleForm: FormGroup;
  pageTitle: string;
  buttonTitle: string;


  constructor(private rolesService: RolesService, private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getRole();
    this.createForm();
  }

  createForm(): void {
    this.roleForm = this.formBuilder.group({
      title: [this.role.title, Validators.required],
    });
  }

  getRole(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.rolesService.getRole(id)
      .subscribe(role => {this.editRole(role); this.role = role; });
      this.pageTitle = 'Edit role.';
      this.buttonTitle = 'SAVE CHANGES';
    }
    else {
      this.role = new Roles(undefined, '');
      this.pageTitle = 'Add new role.';
      this.buttonTitle = 'ADD ROLE';
    }
  }

  editRole(role: Roles) {
    this.roleForm.patchValue({
      title: role.title
    });
  }

  onSubmit() {
    this.mapFormValueToModel();
    if (this.role.id === undefined) {
      this.rolesService.addRole(this.role);
    }
    else {
      this.rolesService.updateRole(this.role.id, this.role);
    }
  }

  mapFormValueToModel() {
    this.role.title = this.roleForm.value.title;
  }

  goBack() {
    this.rolesService.goBack();
  }
}
