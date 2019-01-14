import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGamesComponent } from './item-games.component';

describe('ItemGamesComponent', () => {
  let component: ItemGamesComponent;
  let fixture: ComponentFixture<ItemGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
