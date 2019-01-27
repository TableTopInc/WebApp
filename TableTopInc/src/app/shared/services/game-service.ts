import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Game} from '../models/game';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root'})
export class GameService{
game:Game[]=[];
itemGame:Game;

private gamesUrl = 'https://tabletop-api-dev.azurewebsites.net/api/games';

    constructor(private http: HttpClient){
      this.getGames();
    }

    public headers = new HttpHeaders()
     .append('accept', 'application/json');
     


    getGames():Observable<Game[]>  {
      return this.http.get<Game[]>(this.gamesUrl,{headers: this.headers})  
    }

    getGame(id: string): Observable<Game> {
      const url = `${this.gamesUrl}/${id}`;
      return this.http.get<Game>(url)
    }
      
    deleteGame (game: Game | string): Observable<Game> {
      const id = typeof game === 'string' ? game : game.id;
      const url = `${this.gamesUrl}/${id}`;
      return this.http.delete<Game>(url, {headers: this.headers});
    }

    addGame(id:string, title:string, description: string, coverUrl: string, playersFrom: number,
      playersTo: number, sessionMinutesFrom: number, sessionMinutesTo: number, ageFrom: number, yearReleased: number) {
      const game = new Game(id, title, description, coverUrl, playersFrom, playersTo, sessionMinutesFrom,
        sessionMinutesTo, ageFrom, yearReleased);
      this.game.push(game);
      return  this.http.post<Game>
      (this.gamesUrl,
        {'id': id, 'title': title, 'description': description, 'coverUrl': coverUrl,
        'playersFrom' : playersFrom, 'playersTo' : playersTo, 'sessionMinutesFrom' : sessionMinutesFrom,
        'sessionMinutesTo' : sessionMinutesTo, 'ageFrom' : ageFrom, 'yearReleased' : yearReleased
      }, {headers: this.headers});
    }

    updateGame(id: string, game: Game) {
      const urlParams = new HttpParams().set("id", id.toString());
      return this.http.post(this.gamesUrl, game, { params: urlParams});
  }

    
}