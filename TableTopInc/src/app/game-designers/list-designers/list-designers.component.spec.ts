import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesignersComponent } from './list-designers.component';
import { DesignersService } from '../../shared/services/designers-service';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';



import { Designer } from '../../shared/models/designer';
import { DesignersData } from '../../shared/designers-data';


describe('ListDesignersComponent', () => {
  let component: ListDesignersComponent;
  let fixture: ComponentFixture<ListDesignersComponent>;
  let designersService: DesignersService;
  let spy: jasmine.Spy;
  let mockDesigner;
  let designers: Designer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesignersComponent ],
      providers: [DesignersService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesignersComponent);
    component = fixture.componentInstance;
    designersService = fixture.debugElement.injector.get(DesignersService);
    mockDesigner = DesignersData;
    spy = spyOn(designersService, "deleteDesigners").and.returnValue(of(mockDesigner));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call designersService', () => {
    component.getDesigners();
    component.onDelete(designers);
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set designers', () => {
    component.getDesigners();
    expect(component.designers).toEqual(mockDesigner)
  });

  it('should delete', () => {
    component.onDelete(designers);
    expect(component.designers).toBeTruthy(mockDesigner);
  });
});
