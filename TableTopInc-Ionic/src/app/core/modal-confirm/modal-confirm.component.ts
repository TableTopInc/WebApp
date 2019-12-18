import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalConfirmComponent>) { }

  public confirmMessage: string;
  public confirmTitle: string;

  ngOnInit() {
  }

}
