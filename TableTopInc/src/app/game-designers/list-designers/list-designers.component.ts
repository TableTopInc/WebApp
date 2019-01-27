import { Component, OnInit } from '@angular/core';

import { Designer } from '../../shared/models/designer';
import { DesignersService } from '../../shared/services/designers-service';

@Component({
  selector: 'app-list-designers',
  templateUrl: './list-designers.component.html',
  styleUrls: ['./list-designers.component.scss'],
  providers: [DesignersService]
})
export class ListDesignersComponent implements OnInit {
  designers:Designer[];

  constructor(private designersService:DesignersService) { }

  ngOnInit() {
    this.getDesigners();
  }

  getDesigners(): void {
    this.designersService.getDesigners()
    .subscribe(designers => this.designers = designers);
 }

  onDelete(designer: Designer): void {
    this.designers = this.designers.filter(h => h !== designer);
    this.designersService.deleteDesigner(designer).subscribe();
  }
}
