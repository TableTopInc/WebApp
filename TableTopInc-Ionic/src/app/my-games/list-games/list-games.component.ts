import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Game } from '../../shared/models/game';
import { GameService } from '../../shared/services/game-service';
import { ModalConfirmComponent } from '../../core/modal-confirm/modal-confirm.component';
import { LoadingService } from '../../shared/services/loading-service';


@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.scss'],
})
export class ListGamesComponent implements OnInit {
  games: Game[];
  dialogRef: MatDialogRef<ModalConfirmComponent>;

  constructor(public gameService: GameService, 
    public dialog: MatDialog,
    public loading: LoadingService
    ) {
  }

  ngOnInit() {
    this.getGames();
    this.loading.presentLoading();
  }

  onDelete(game: Game): void {
    this.games = this.games.filter(h => h !== game);
    this.gameService.deleteGame(game).subscribe();
  }

  getGames(): void {
    this.gameService.getGames()
    .subscribe(games => {this.games = games; this.loading.dismiss();});
  }

  openConfirmationDialog(game: Game) {
    this.dialogRef = this.dialog.open(ModalConfirmComponent, {disableClose: false});
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.componentInstance.confirmTitle =  game.title;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(game);
      }
      this.dialogRef = null;
    });
  }
}
