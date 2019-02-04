import { Component, OnInit} from '@angular/core';
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

  itemGame = {} as Game;
  change: boolean;

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.gameService.getGame(id)
      .subscribe(itemGame => this.itemGame = itemGame);
      this.change = true;
    }
    else {
      this.itemGame = new Game(undefined, '', '', '', null, null, null, null, null, null);
      this.change = false;
    }
  }

  onSubmit() {
    if (this.itemGame.id === undefined) {
      this.gameService.addGame(this.itemGame);
    }
    else {
      this.gameService.updateGame(this.itemGame.id, this.itemGame);
    }
  }

  goBack() {
    this.gameService.goBack();
  }
}
