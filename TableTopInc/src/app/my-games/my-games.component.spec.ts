import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MyGamesComponent } from './my-games.component';

describe('MyGamesComponent', () => {
  let component: MyGamesComponent;
  let fixture: ComponentFixture<MyGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGamesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
