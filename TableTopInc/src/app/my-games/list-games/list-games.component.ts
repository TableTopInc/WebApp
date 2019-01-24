import { Component, OnInit} from '@angular/core';

import { Game } from '../../shared/models/game';
import { GameService } from '../../shared/services/game-service';


@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss'],
  providers: [GameService]
})
export class ListGamesComponent implements OnInit {
  game:Game[];

  constructor(private gameService:GameService) {
    
   }
  
  ngOnInit() {
    this.getGames();
    
  }

  onDelete(game: Game): void {
    this.game = this.game.filter(h => h !== game);
    this.gameService.deleteGame(game).subscribe();
  }
  
  getGames(): void {
     this.gameService.getGames()
     .subscribe(game => this.game = game);
  }
   
}
