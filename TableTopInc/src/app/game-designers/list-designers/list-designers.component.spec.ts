import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesignersComponent } from './list-designers.component';



describe('ListDesignersComponent', () => {
  let component: ListDesignersComponent;
  let fixture: ComponentFixture<ListDesignersComponent>;
 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesignersComponent ],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
