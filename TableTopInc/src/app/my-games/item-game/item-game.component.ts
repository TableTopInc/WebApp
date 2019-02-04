import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../shared/models/game';
import { GameService } from '../../shared/services/game-service';
import { ActivatedRoute} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-item-game',
  templateUrl: './item-game.component.html',
  styleUrls: ['./item-game.component.scss'],
})
export class ItemGameComponent implements OnInit {

  @Input() itemGame: Game;

  constructor(private gameService: GameService, private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.getGame();
    this.spinnerService.show();
  }

  getGame(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.getGame(id)
    .subscribe(itemGame => {this.itemGame = itemGame; this.spinnerService.hide(); });
  }
}
