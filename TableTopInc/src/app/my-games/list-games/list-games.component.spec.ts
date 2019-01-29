import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ListGamesComponent } from './list-games.component';
import { GameService } from '../../shared/services/game-service';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../shared/models/game';

describe('ListGamesComponent', () => {
  let component: ListGamesComponent;
  let fixture: ComponentFixture<ListGamesComponent>;
  let gameService:GameService;
  let spy:jasmine.Spy;
  let spyDelete:jasmine.Spy;
  let mockGame;
  let game:Game;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGamesComponent ],
      providers: [ GameService ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGamesComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    mockGame = [{
      id: '01',
      title: 'name',
      description: 'description',
      coverUrl: 'url',
      playersFrom: 1,
      playersTo: 2,
      sessionMinutesFrom: 10,
      sessionMinutesTo: 20,
      ageFrom: 7,
      yearReleased: 2222,
    }];
    spy = spyOn(gameService, 'getGames').and.returnValue(of(mockGame));
    spyDelete = spyOn(gameService, 'deleteGame').and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getGames', () => {
    component.getGames();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should call deleteGame', () => {
    component.onDelete(game);
    expect(spyDelete.calls.any()).toBe(true);
  });

  it('should set games', () => {
    component.getGames();
    expect(component.game).toEqual(mockGame);
  });


  
});
