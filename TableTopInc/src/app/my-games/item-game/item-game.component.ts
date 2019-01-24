import { Component, OnInit } from '@angular/core';
import { Game } from '../../shared/models/game';
import { GameService } from '../../shared/services/game-service';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-item-game',
  templateUrl: './item-game.component.html',
  styleUrls: ['./item-game.component.scss'],
  providers: [GameService]
})
export class ItemGameComponent implements OnInit {
  
  itemGame:Game;
  
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
  save(): void {
    this.gameService.updateGame(this.itemGame);
  }

}
