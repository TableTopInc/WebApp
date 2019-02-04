import { Component, OnInit, Input } from '@angular/core';
import { Roles } from '../../shared/models/roles';
import { RolesService } from '../../shared/services/roles-service';
import { ActivatedRoute} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-item-role',
  templateUrl: './item-role.component.html',
  styleUrls: ['./item-role.component.scss'],
})
export class ItemRoleComponent implements OnInit {

  @Input() role: Roles;

  constructor(private rolesService: RolesService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getRole();
    this.spinnerService.show();
  }

  getRole(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.rolesService.getRole(id)
    .subscribe(role => {this.role = role; this.spinnerService.hide(); });
  }
}
