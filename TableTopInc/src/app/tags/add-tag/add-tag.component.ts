import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { TagsService } from '../../shared/services/tags-service';
import { Location } from '@angular/common';
import { GroupTag } from '../../shared/models/group-tag';
import { Tag } from '../../shared/models/tag';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

  addGroupForm: FormGroup;
  addTagForm: FormGroup;
  group = {} as GroupTag;
  tag = {} as Tag;
  allGroup = [] as GroupTag[];
  groupTitle: string;
  groupButton: string;
  tagTitle: string;
  tagButton: string;
  showAddTag: boolean;
  showAddGroup: boolean;
  editButton: boolean;
  filteredOptions: Observable<GroupTag[]>;
  groupId: GroupTag;
  confirm: boolean;
  newGroupTitle: string;


  constructor(private formBuilder: FormBuilder, private tagService: TagsService,
    private route: ActivatedRoute, private location: Location, private spinnerService: Ng4LoadingSpinnerService) {

  }

  ngOnInit() {
    this.spinnerService.show();
    this.getAllGroup();
    this.createForm();
    const group = this.route.snapshot.paramMap.get('group');
    if (group) {
      this.getGroup();
    }
    else {
      this.getTag();
    }
    this.filteredOptions = this.addTagForm.get('selectGroup').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getAllGroup() {
    this.tagService.getAllGroup()
      .subscribe(groups => { this.allGroup = groups; this.spinnerService.hide(); });
  }

  createForm(): void {
    this.addGroupForm = this.formBuilder.group({
      addGroup: [this.group.title, Validators.required],
    });
    this.addTagForm = this.formBuilder.group({
      addTag: [this.tag.title, Validators.required],
      selectGroup: [''],
    },
      {
        validator: this.specificValueInsideRange.bind(this),
      }
    );
  }

  specificValueInsideRange(group: AbstractControl) {
    const selectedValue = this.allGroup.find(item => item.title === group.value.selectGroup);
    this.groupId = selectedValue;
    if (!selectedValue) {
      return {
        outsideRange: true
      };
    }
  }

  _filter(value: string): GroupTag[] {
    const filterValue = value.toLowerCase();
    return this.allGroup.filter(group => group.title.toLowerCase().indexOf(filterValue) === 0);
  }

  getGroup(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.tagService.getGroup(id)
        .subscribe(group => {this.editGroup(group); this.group = group; });
      this.groupTitle = 'Edit group.';
      this.groupButton = 'SAVE';
      this.showAddGroup = true;
      this.editButton = true;
    }
    else {
      this.group = new GroupTag([], undefined, '');
      this.showAddTag = true;
    }
  }

  getTag(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.tagService.getTag(id)
        .subscribe(tag => { this.editTag(tag); this.tag = tag; });
      this.showAddTag = true;
      this.tagButton = 'SAVE';
      this.tagTitle = 'Edit tag.';
      this.showAddGroup = false;
      this.editButton = true;
    }
    else {
      this.tag = new Tag(undefined, '', '');
      this.showAddTag = true;
      this.showAddGroup = true;
      this.groupTitle = 'Add group.';
      this.tagTitle = 'Add tag.';
      this.groupButton = 'ADD GROUP';
      this.tagButton = 'ADD TAG';
      this.editButton = false;
    }
  }

  addGroup() {
    this.mapFormValueToModel();
    if (this.group.id === undefined) {
      this.tagService.addGroup(this.group).subscribe(result => {
        this.allGroup.push(result);
        this.getAllGroup();
      });
      this.newGroupTitle = this.addGroupForm.value.addGroup;
      this.addGroupForm.reset();
      this.confirm = true;
    }
    else {
      this.tagService.updateGroup(this.group.id, this.group);
    }
  }

  onSubmit() {
    this.mapFormValueToModel();
    if (this.tag.id === undefined) {
      this.tag.tagGroupId = this.groupId.id;
      this.tagService.addTag(this.tag);
    }
    else {
      this.tagService.updateTag(this.tag.id, this.tag);
    }
  }

  editGroup(group: GroupTag) {
    this.addGroupForm.patchValue({
      addGroup: group.title,
    });
  }

  editTag(tag: Tag) {
    this.addTagForm.patchValue({
      addTag: tag.title,
    });
  }

  mapFormValueToModel() {
    this.group.title = this.addGroupForm.value.addGroup;
    this.tag.title = this.addTagForm.value.addTag;
  }

  close() {
    this.confirm = false;
  }

  goBack(): void {
    this.location.back();
  }
}
