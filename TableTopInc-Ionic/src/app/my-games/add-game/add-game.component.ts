import { Component, OnInit} from '@angular/core';
import { GameService } from '../../shared/services/game-service';
import { Game } from '../../shared/models/game';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { TagsService } from '../../shared/services/tags-service';
import { GroupTag } from '../../shared/models/group-tag';
import { Tag } from '../../shared/models/tag';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
})
export class AddGameComponent implements OnInit {

  itemGame = {} as Game;
  tagForm: FormGroup;
  addForm: FormGroup;
  pageTitle: string;
  buttonTitle: string;
  tags = [] as Tag[];
  allGroup = [] as GroupTag[];
  tagGroupOptions: Observable<GroupTag[]>;
  listTags: Tag[] = [];

  constructor(private gameService: GameService, private tagService: TagsService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    // private spinnerService: Ng4LoadingSpinnerService
    ) {

  }

  ngOnInit() {
    this.getGame();
    this.createForm();
    this.getAllGroup();
    this.getTags();
    this.tagGroupOptions = this.tagForm.get('tag').valueChanges
    .pipe(startWith(''), map(value => this._filterGroup(value))
    );
    // this.spinnerService.show();
  }

  createForm(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.addForm = this.formBuilder.group({
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
    this.tagForm = this.formBuilder.group({
      tag: [''],
    },
    {
      validator: this.specificValueInsideRange.bind(this),
    });
  }

  getAllGroup() {
    this.tagService.getAllGroup()
    .subscribe(groups => {this.allGroup = groups;});
  }

  getTags() {
    this.tagService.getTags()
    .subscribe(groups => {this.tags = groups; });
  }

  _filterGroup(value: string): GroupTag[] {
      return this.allGroup
      .map(result => ({id: result.id, title: result.title, tags: this._filter(result.tags, value)}))
      .filter(allGroup => allGroup.tags.length > 0);
  }

  _filter = (opt: Tag[], value: string): Tag[] => {
    const filterValue = value.toLowerCase();
      return opt.filter(item => item.title.toLowerCase().indexOf(filterValue) === 0 &&
      this.listTags.filter(tag => tag.id.toLowerCase() === item.id.toLowerCase()).length === 0
      );
  }

  addTag() {
    this.tags.filter(item => item.title === this.tagForm.value.tag &&
      this.listTags.push({id: item.id, title: item.title, tagGroupId: item.tagGroupId}));
      this.tagForm.patchValue({tag: ''});
      console.log(this.listTags);
  }

  deleteTag(tag: Tag) {
    const index = this.listTags.indexOf(tag);
    if (index > -1) {
      this.listTags.splice(index, 1);
    }
  }

  specificValueInsideRange(group: AbstractControl) {
    const selectedValue = this.tags.find(item => item.title === group.value.tag);
     if (!selectedValue) {
       return {
         outsideRange: true
       };
     }
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
    this.addForm.patchValue({
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
    this.itemGame.title = this.addForm.value.title;
    this.itemGame.yearReleased = this.addForm.value.yearReleased;
    this.itemGame.coverUrl = this.addForm.value.coverUrl;
    this.itemGame.playersFrom = this.addForm.value.playersFrom;
    this.itemGame.playersTo = this.addForm.value.playersTo;
    this.itemGame.sessionMinutesFrom = this.addForm.value.sessionMinutesFrom;
    this.itemGame.sessionMinutesTo = this.addForm.value.sessionMinutesTo;
    this.itemGame.ageFrom = this.addForm.value.ageFrom;
    this.itemGame.description = this.addForm.value.description;
  }

  goBack() {
    this.gameService.goBack();
  }
}
