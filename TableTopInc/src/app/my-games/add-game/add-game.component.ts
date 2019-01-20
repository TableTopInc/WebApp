import { Component, OnInit } from '@angular/core';
import { GameService } from '../../shared/services/game-service';
import { Game } from '../../shared/models/game';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
  providers: [GameService]
})
export class AddGameComponent implements OnInit {

  public game = this.gameService.getGames();
  itemGame:Game;
 

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

  newTitle:string;
  newDescription:string;
  newCoverUrl:string;


  constructor(private gameService:GameService, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.getGame();
  }
  
  getGame(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id)
    .subscribe(itemGame => this.itemGame = itemGame);
  }

  onSubmit() {
   
    this.gameService.addGame(this.Id, this.Title, this.Description, this.CoverUrl, this.PlayersFrom, 
      this.PlayersTo, this.SessionMinutesFrom, this.SessionMinutesTo, this.AgeFrom, this.YearReleased);
  }
 
}
