import { Component, OnInit} from '@angular/core';
import { DesignersService } from '../../shared/services/designers-service';
import { Designer } from '../../shared/models/designer';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-designer',
  templateUrl: './add-designer.component.html',
  styleUrls: ['./add-designer.component.scss'],
})
export class AddDesignerComponent implements OnInit {

  designer = {} as Designer;
  designerForm: FormGroup;
  pageTitle: string;
  buttonTitle: string;

  constructor(private designersService: DesignersService, private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getDesigner();
    this.createForm();
  }

  createForm(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.designerForm = this.formBuilder.group({
      firstName: [this.designer.firstName, Validators.required],
      lastName: [this.designer.lastName, Validators.required],
      bio: [this.designer.bio],
      photoUrl: [this.designer.photoUrl, Validators.pattern(reg)]
    });
  }

  getDesigner(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.designersService.getDesigner(id)
      .subscribe(designer => {this.editDesigner(designer); this.designer = designer; });
      this.pageTitle = 'Edit designer.';
      this.buttonTitle = 'SAVE CHANGES';
    }
    else {
      this.designer = new Designer(undefined, '', '', '', '');
      this.pageTitle = 'Add new designer.';
      this.buttonTitle = 'ADD DESIGNER';
    }
  }

  editDesigner(designer: Designer) {
    this.designerForm.patchValue({
      firstName: designer.firstName,
      lastName: designer.lastName,
      bio: designer.bio,
      photoUrl: designer.photoUrl
    });
  }

  onSubmit() {
    this.mapFormValueToModel();
    if (this.designer.id === undefined) {
      this.designersService.addDesigner(this.designer);
    }
    else {
      this.designersService.updateDesigner(this.designer.id, this.designer);
    }
  }

  mapFormValueToModel() {
    this.designer.firstName = this.designerForm.value.firstName;
    this.designer.lastName = this.designerForm.value.lastName;
    this.designer.bio = this.designerForm.value.bio;
    this.designer.photoUrl = this.designerForm.value.photoUrl;
  }

  goBack() {
    this.designersService.goBack();
  }
}
