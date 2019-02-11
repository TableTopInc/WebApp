import { Component, OnInit} from '@angular/core';
import { GameService } from '../../shared/services/game-service';
import { Game } from '../../shared/models/game';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent implements OnInit {

  itemGame = {} as Game;
  gameForm: FormGroup;
  pageTitle: string;
  buttonTitle: string;

  constructor(private gameService: GameService, private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getGame();
    this.createForm();
  }

  createForm(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.gameForm = this.formBuilder.group({
      title: [this.itemGame.title, Validators.required],
      yearReleased: [this.itemGame.yearReleased, Validators.pattern('[0-9]{4}')],
      coverUrl: [this.itemGame.coverUrl, Validators.pattern(reg)],
      playersFrom: [this.itemGame.playersFrom],
      playersTo: [this.itemGame.playersTo],
      sessionMinutesFrom: [this.itemGame.sessionMinutesFrom],
      sessionMinutesTo: [this.itemGame.sessionMinutesTo],
      ageFrom: [this.itemGame.ageFrom],
      description: [this.itemGame.description]
    });
  }

  getGame(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.gameService.getGame(id)
      .subscribe(itemGame => {this.editGame(itemGame); this.itemGame = itemGame; });
      this.pageTitle = 'Edit game.';
      this.buttonTitle = 'SAVE CHANGES';
    }
    else {
      this.itemGame = new Game(undefined, '', '', '', null, null, null, null, null, null);
      this.pageTitle = 'Add new game.';
      this.buttonTitle = 'ADD GAME';
    }
  }

  editGame(itemGame: Game) {
    this.gameForm.patchValue({
      title: itemGame.title,
      yearReleased: itemGame.yearReleased,
      coverUrl: itemGame.coverUrl,
      playersFrom: itemGame.playersFrom,
      playersTo: itemGame.playersTo,
      sessionMinutesFrom: itemGame.sessionMinutesFrom,
      sessionMinutesTo: itemGame.sessionMinutesTo,
      ageFrom: itemGame.ageFrom,
      description: itemGame.description
    });
  }

  onSubmit() {
      this.mapFormValueToModel();
      if (this.itemGame.id === undefined) {
      this.gameService.addGame(this.itemGame);
    }
    else {
      this.gameService.updateGame(this.itemGame.id, this.itemGame);
    }
  }

  mapFormValueToModel() {
    this.itemGame.title = this.gameForm.value.title;
    this.itemGame.yearReleased = this.gameForm.value.yearReleased;
    this.itemGame.coverUrl = this.gameForm.value.coverUrl;
    this.itemGame.playersFrom = this.gameForm.value.playersFrom;
    this.itemGame.playersTo = this.gameForm.value.playersTo;
    this.itemGame.sessionMinutesFrom = this.gameForm.value.sessionMinutesFrom;
    this.itemGame.sessionMinutesTo = this.gameForm.value.sessionMinutesTo;
    this.itemGame.ageFrom = this.gameForm.value.ageFrom;
    this.itemGame.description = this.gameForm.value.description;
  }

  goBack() {
    this.gameService.goBack();
  }
}
