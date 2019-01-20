import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Game} from '../models/game';
import {GameData} from '../games-data';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root'})
export class GameService{
game:Game[]=GameData;
itemGame:Game;

    constructor(private http: HttpClient){}

    getGames():Observable<Game[]>  {
      console.log(this.game);
      return of(GameData);  
    }

    getGame(id: string): Observable<Game> {   
     return of(GameData.find(itemGame => itemGame.id === id));
    }
      
    deleteGame(game: Game) {
        const index = this.game.indexOf(game);
         if (index > -1) {
           this.game.splice(index, 1);
         }
    }
    
    addGame(id:string, title:string, description: string, coverUrl: string, playersFrom: number,
      playersTo: number, sessionMinutesFrom: number, sessionMinutesTo: number, ageFrom: number, yearReleased: number) {
      const game = new Game(id, title, description, coverUrl, playersFrom, playersTo, sessionMinutesFrom,
        sessionMinutesTo, ageFrom, yearReleased);
      this.game.push(game);
    }
    getData() {
      return this.http.get<any>('https://tabletop-api-dev.azurewebsites.net/api/games')
      .subscribe(res => {localStorage.setItem('game', JSON.stringify(res));});
    }
    
}