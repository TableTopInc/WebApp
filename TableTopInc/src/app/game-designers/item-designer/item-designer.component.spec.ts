import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDesignerComponent } from './item-designer.component';
import { DesignersService } from '../../shared/services/designers-service';
import { Designer } from '../../shared/models/designer';

describe('ItemDesignerComponent', () => {
  let component: ItemDesignerComponent;
  let fixture: ComponentFixture<ItemDesignerComponent>;
  let designersService: DesignersService;
  let spy: jasmine.Spy;
  let mockDesigner;
  let designers: Designer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
