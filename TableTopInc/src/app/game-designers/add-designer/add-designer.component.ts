import { Component, OnInit } from '@angular/core';
import { DesignersService } from '../../shared/services/designers-service';
import { Designer } from '../../shared/models/designer';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-designer',
  templateUrl: './add-designer.component.html',
  styleUrls: ['./add-designer.component.scss'],
  providers: [DesignersService]
})
export class AddDesignerComponent implements OnInit {

  designer:Designer;

  Id ='';
  FirstName = '';
  LastName = '';
  Bio = '';
  PhotoUrl = '';

  constructor(private designersService:DesignersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDesigner();
  }

  getDesigner(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.designersService.getDesigner(id)
    .subscribe(designer => this.designer = designer);
  }

  onSubmit() {
   
    this.designersService.addDesigner(this.Id, this.FirstName, this.LastName, this.Bio, this.PhotoUrl);
  }

}
