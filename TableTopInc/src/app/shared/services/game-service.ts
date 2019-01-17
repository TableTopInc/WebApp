import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Game} from '../models/game';
import {GameData} from '../games-data';
import {Observable} from 'rxjs';

@Injectable()
export class GameService{
game:Game[] = GameData;


    constructor(private http: HttpClient){console.log(this.getData()); }

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

    addGame(Id:number, Title:string, Description: string, CoverUrl: string, PlayersFrom: number,
      PlayersTo: number, SessionMinutesFrom: number, SessionMinutesTo: number, AgeFrom: number, YearReleased: number) {
      const game = new Game(Id, Title, Description, CoverUrl, PlayersFrom, PlayersTo, SessionMinutesFrom,
        SessionMinutesTo, AgeFrom, YearReleased);
      this.game.push(game);
    }
    getData() {
      return this.http.get<any>('https://tabletop-api-dev.azurewebsites.net/api/games')
      .subscribe(res => console.log(res));
    }
    
}