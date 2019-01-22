import { Component, OnInit } from '@angular/core';
import { Designer } from '../../shared/models/designer';
import { DesignersService } from '../../shared/services/designers-service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item-designer',
  templateUrl: './item-designer.component.html',
  styleUrls: ['./item-designer.component.scss'],
  providers: [DesignersService]
})
export class ItemDesignerComponent implements OnInit {

  designer:Designer;

  constructor(private designersService:DesignersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDesigner();
  }

  getDesigner(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.designersService.getDesigner(id)
    .subscribe(designer => this.designer = designer);
  }

}
