import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Designer } from '../../shared/models/designer';
import { DesignersService } from '../../shared/services/designers-service';
import { ModalConfirmComponent } from '../../core/modal-confirm/modal-confirm.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list-designers',
  templateUrl: './list-designers.component.html',
  styleUrls: ['./list-designers.component.scss'],
})
export class ListDesignersComponent implements OnInit {
  designers: Designer[];
  dialogRef: MatDialogRef<ModalConfirmComponent>;

  constructor(private designersService: DesignersService, public dialog: MatDialog, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getDesigners();
    this.spinnerService.show();
  }

  getDesigners(): void {
    this.designersService.getDesigners()
    .subscribe(designers => {this.designers = designers; this.spinnerService.hide(); });
 }

  onDelete(designer: Designer): void {
    this.designers = this.designers.filter(h => h !== designer);
    this.designersService.deleteDesigner(designer).subscribe();
  }

  openConfirmationDialog(designer: Designer) {
    this.dialogRef = this.dialog.open(ModalConfirmComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.componentInstance.confirmTitle =  designer.firstName + ' ' + designer.lastName;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(designer);
      }
      this.dialogRef = null;
    });
  }
}
