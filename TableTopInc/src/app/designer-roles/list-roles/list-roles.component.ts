import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Roles } from '../../shared/models/roles';
import { RolesService } from '../../shared/services/roles-service';
import { ModalConfirmComponent } from '../../core/modal-confirm/modal-confirm.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss'],
})

export class ListRolesComponent implements OnInit {

  roles: Roles[];
  dialogRef: MatDialogRef<ModalConfirmComponent>;

  constructor(private rolesService: RolesService, public dialog: MatDialog, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getRoles();
    this.spinnerService.show();
  }

  onDelete(role: Roles): void {
    this.roles = this.roles.filter(h => h !== role);
    this.rolesService.deleteRole(role).subscribe();
  }

  getRoles(): void {
    this.rolesService.getRoles()
    .subscribe(roles => {this.roles = roles; this.spinnerService.hide(); });
 }

  openConfirmationDialog(role: Roles) {
    this.dialogRef = this.dialog.open(ModalConfirmComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.componentInstance.confirmTitle =  role.title;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.onDelete(role);
      }
      this.dialogRef = null;
    });
  }

}
