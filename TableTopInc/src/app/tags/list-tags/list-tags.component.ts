import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { GroupTag } from '../../shared/models/group-tag';
import { Tag } from '../../shared/models/tag';
import { ModalConfirmComponent } from '../../core/modal-confirm/modal-confirm.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { TagsService } from '../../shared/services/tags-service';



@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.scss']
})
export class ListTagsComponent implements OnInit {
  allGroup: GroupTag[];
  allTag: Tag[];
  dialogRef: MatDialogRef<ModalConfirmComponent>;

  constructor(public dialog: MatDialog, private spinnerService: Ng4LoadingSpinnerService,
    private tagService: TagsService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.getAllGroup();
    this.getAllTag();
  }

  getAllGroup() {
    this.tagService.getAllGroup()
    .subscribe(groups => {this.allGroup = groups; this.spinnerService.hide(); });
  }

  getAllTag() {
    this.tagService.getTags()
    .subscribe(tags => {this.allTag = tags; this.spinnerService.hide(); });
  }

  deleteGroup(group: GroupTag) {
    this.dialogRef = this.dialog.open(ModalConfirmComponent, {disableClose: false});
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.componentInstance.confirmTitle =  group.title;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.allGroup = this.allGroup.filter(g => g !== group);
    this.tagService.deleteGroup(group).subscribe();
        }
      this.dialogRef = null;
    });
  }

  deleteTag(tag: Tag) {
    this.dialogRef = this.dialog.open(ModalConfirmComponent, {disableClose: false});
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.componentInstance.confirmTitle =  tag.title;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.allTag = this.allTag.filter(t => t !== tag);
    this.tagService.deleteTag(tag).subscribe(() => this.getAllGroup());
        }
      this.dialogRef = null;
    });
  }

  goBack(): void {
    this.tagService.goBack();
  }
}
