import { Component, OnInit} from '@angular/core';
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

  designer = {} as Designer;
  change: boolean;

  constructor(private designersService: DesignersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDesigner();
  }

  getDesigner(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.designersService.getDesigner(id)
      .subscribe(designer => this.designer = designer);
      this.change = true;
    }
    else {
      this.designer = new Designer(undefined, '', '', '', '');
      this.change = false;
    }
  }

  onSubmit() {
    if (this.designer.id === undefined) {
      this.designersService.addDesigner(this.designer);
    }
    else {
      this.designersService.updateDesigner(this.designer.id, this.designer);
    }
  }

  goBack() {
    this.designersService.goBack();
  }
}
