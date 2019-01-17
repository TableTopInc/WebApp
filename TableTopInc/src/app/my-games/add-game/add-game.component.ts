import { Component, OnInit } from '@angular/core';
import { GameService } from '../../shared/services/game-service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
  providers: [GameService]
})
export class AddGameComponent implements OnInit {

  public game = this.gameService.getGames();

  Id;
  Title = '';
  Description = '';
  CoverUrl = '';
  PlayersFrom;
  PlayersTo;
  SessionMinutesFrom;
  SessionMinutesTo;
  AgeFrom;
  YearReleased;

  constructor(private gameService:GameService) { }

  ngOnInit() {
  }

  onSubmit() {
   
    this.gameService.addGame(this.Id, this.Title, this.Description, this.CoverUrl, this.PlayersFrom, 
      this.PlayersTo, this.SessionMinutesFrom, this.SessionMinutesTo, this.AgeFrom, this.YearReleased);
  }

}
