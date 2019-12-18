import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatAutocompleteModule, MatInputModule } from '@angular/material';

import { ListTagsComponent } from './list-tags/list-tags.component';
import { AddTagComponent } from './add-tag/add-tag.component';


@NgModule({
  declarations: [ListTagsComponent, AddTagComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class TagsModule { }
