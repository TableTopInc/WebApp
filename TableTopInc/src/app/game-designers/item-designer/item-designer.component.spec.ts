import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDesignerComponent } from './item-designer.component';

describe('ItemDesignerComponent', () => {
  let component: ItemDesignerComponent;
  let fixture: ComponentFixture<ItemDesignerComponent>;

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
