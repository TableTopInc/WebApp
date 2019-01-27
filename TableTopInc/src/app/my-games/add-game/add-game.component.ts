import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../shared/services/game-service';
import { Game } from '../../shared/models/game';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
  providers: [GameService]
})
export class AddGameComponent implements OnInit {
 
  @Input() itemGame:Game;
 
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

  constructor(private gameService:GameService, private route: ActivatedRoute, private location: Location) { 
    
  }

  ngOnInit() {
    this.getGame();
  }
  
  getGame(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id)
    .subscribe(itemGame => this.itemGame = itemGame);
  }
 
  onSubmit(){
    this.gameService.addGame(this.Id, this.Title, this.Description, this.CoverUrl, this.PlayersFrom, 
    this.PlayersTo, this.SessionMinutesFrom, this.SessionMinutesTo, this.AgeFrom, this.YearReleased)
    .subscribe(() => this.goBack());  
  }
  
  editGame(game: Game) {
    this.itemGame = new Game(game.id, game.title, game.description, game.coverUrl, game.playersFrom, 
      game.playersTo, game.sessionMinutesFrom, game.sessionMinutesTo, game.ageFrom, game.yearReleased);
  }

  goBack(): void {
  this.location.back();
  }

  save() {
      this.gameService.updateGame(this.itemGame.id, this.itemGame).subscribe(() => this.goBack());
  }
  
}
