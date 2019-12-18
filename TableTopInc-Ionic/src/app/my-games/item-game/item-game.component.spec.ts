import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ItemGameComponent } from './item-game.component';
import { GameService } from '../../shared/services/game-service';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../shared/models/game';


describe('ItemGameComponent', () => {
  let component: ItemGameComponent;
  let fixture: ComponentFixture<ItemGameComponent>;
  let gameService: GameService;
  let spy: jasmine.Spy;
  let game: Game;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGameComponent ],
      providers: [ GameService,
        { provide: Ng4LoadingSpinnerService, useValue: new Ng4LoadingSpinnerService() }],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGameComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    game = {
      id: '01',
      title: 'name2',
      description: 'description',
      coverUrl: 'url',
      playersFrom: 1,
      playersTo: 2,
      sessionMinutesFrom: 10,
      sessionMinutesTo: 20,
      ageFrom: 7,
      yearReleased: 2222,
    };
    spy = spyOn(gameService, 'getGame').and.returnValue(of(game));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getGame', () => {
    component.getGame();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set game', () => {
    component.getGame();
    expect(component.itemGame).toEqual(game);
  });

});
