import { Component, OnInit} from '@angular/core';

import { Game } from '../../shared/models/game';
import { GameService } from '../../shared/services/game-service';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss'],
  providers: [HttpClient]
})
export class ListGamesComponent implements OnInit {
  game:Game[];
 
  constructor(private gameService:GameService, private http: HttpClient) {
    this.game = [];
   }
 
 
  ngOnInit() {
    this.game = this.gameService.getGames();
  }

  onDelete(game: Game) {
    this.gameService.deleteGame(game);
  }
}
