import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ListDesignersComponent } from './list-designers.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



describe('ListDesignersComponent', () => {
  let component: ListDesignersComponent;
  let fixture: ComponentFixture<ListDesignersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDesignersComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule, RouterTestingModule ],
      providers: [{ provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: Ng4LoadingSpinnerService, useValue: new Ng4LoadingSpinnerService() }
      ]
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
