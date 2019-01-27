import { Component, OnInit, Input } from '@angular/core';
import { DesignersService } from '../../shared/services/designers-service';
import { Designer } from '../../shared/models/designer';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-designer',
  templateUrl: './add-designer.component.html',
  styleUrls: ['./add-designer.component.scss'],
  providers: [DesignersService]
})
export class AddDesignerComponent implements OnInit {

  @Input() designer:Designer;

  Id ='';
  FirstName = '';
  LastName = '';
  Bio = '';
  PhotoUrl = '';

  constructor(private designersService:DesignersService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getDesigner();
  }

  getDesigner(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.designersService.getDesigner(id)
    .subscribe(designer => this.designer = designer);
  }

  onSubmit(){
    this.designersService.addDesigner(this.Id, this.FirstName, this.LastName, this.Bio, this.PhotoUrl)
    .subscribe(() => this.goBack());  
  }

  editDesigner(designer: Designer) {
    this.designer = new Designer(designer.id, designer.firstName, designer.lastName, 
    designer.bio, designer.photoUrl);
  }

  goBack(): void {
    this.location.back();
    }

  save() {
    this.designersService.updateDesigner(this.designer.id, this.designer).subscribe(() => this.goBack());
  }

}
