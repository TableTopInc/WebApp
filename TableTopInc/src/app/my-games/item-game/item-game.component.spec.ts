import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGameComponent } from './item-game.component';

describe('ItemGameComponent', () => {
  let component: ItemGameComponent;
  let fixture: ComponentFixture<ItemGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
