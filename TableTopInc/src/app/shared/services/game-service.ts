import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Game} from '../models/game';
import {GameData} from '../games-data';
import {Observable} from 'rxjs';

@Injectable()
export class GameService{
game:Game[] =GameData;

    constructor(private http: HttpClient){console.log(this.game); }

    getGames():Game[]  {
        return this.game;
      }

    deleteGame(game: Game) {
        console.log("ok");
        
        const index = this.game.indexOf(game);
        console.log(index);
         if (index > -1) {
           this.game.splice(index, 1);
         }
    }
}