import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AddGameComponent } from './add-game.component';



describe('AddGameComponent', () => {
  let component: AddGameComponent;
  let fixture: ComponentFixture<AddGameComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ FormsModule, HttpClientModule, RouterTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.form'));
    element = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit method', async( () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    element = fixture.debugElement.query(By.css('.add')).nativeElement;
    element.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it('form should be invalid', async( () => {
    component.gameForm.controls['title'].setValue('');
    component.gameForm.controls['yearReleased'].setValue('');
    component.gameForm.controls['coverUrl'].setValue('');
    component.gameForm.controls['playersFrom'].setValue('');
    component.gameForm.controls['playersTo'].setValue('');
    component.gameForm.controls['sessionMinutesFrom'].setValue('');
    component.gameForm.controls['sessionMinutesTo'].setValue('');
    component.gameForm.controls['ageFrom'].setValue('');
    component.gameForm.controls['description'].setValue('');
    expect(component.gameForm.valid).toBeFalsy();
  }));

  it('form should be valid', async( () => {
    component.gameForm.controls['title'].setValue('test');
    component.gameForm.controls['yearReleased'].setValue('2019');
    component.gameForm.controls['coverUrl'].setValue('https://test.test');
    component.gameForm.controls['playersFrom'].setValue('2');
    component.gameForm.controls['playersTo'].setValue('4');
    component.gameForm.controls['sessionMinutesFrom'].setValue('20');
    component.gameForm.controls['sessionMinutesTo'].setValue('40');
    component.gameForm.controls['ageFrom'].setValue('7');
    component.gameForm.controls['description'].setValue('test');
    expect(component.gameForm.valid).toBeTruthy();
  }));
});
