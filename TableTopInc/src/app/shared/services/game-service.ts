import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Game} from '../models/game';
import {GameData} from '../games-data';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root'})
export class GameService{
game:Game[]=GameData;
itemGame:Game;

private gamesUrl = 'https://tabletop-api-dev.azurewebsites.net/api/games';

    constructor(private http: HttpClient){
      this.getGames();
    }

    public headers = new HttpHeaders()
     .append('accept', 'application/json');
     


    getGames():Observable<Game[]>  {
      console.log(this.game);
      return this.http.get<Game[]>('https://tabletop-api-dev.azurewebsites.net/api/games',{headers: this.headers})
      // return of(GameData);  
    }

    getGame(id: string): Observable<Game> {
      const url = `${this.gamesUrl}/${id}`;
      return this.http.get<Game>(url)
    }
    // getGame(id: string): Observable<Game> {   
    //  return of(GameData.find(itemGame => itemGame.id === id));
    // }
      
    deleteGame (game: Game | string): Observable<Game> {
      const id = typeof game === 'string' ? game : game.Id;
      const url = `${this.gamesUrl}/${id}`;
   
      return this.http.delete<Game>(url, {headers: this.headers});
    }

    addGame(id:string, title:string, description: string, coverUrl: string, playersFrom: number,
      playersTo: number, sessionMinutesFrom: number, sessionMinutesTo: number, ageFrom: number, yearReleased: number) {
      const game = new Game(id, title, description, coverUrl, playersFrom, playersTo, sessionMinutesFrom,
        sessionMinutesTo, ageFrom, yearReleased);
      this.game.push(game);
      return this.http.post<any>
      ('https://tabletop-api-dev.azurewebsites.net/api/games',
        {'Id': id, 'Title': title, 'Description': description, 'CoverUrl': coverUrl,
        'PlayersFrom' : playersFrom, 'PlayersTo' : playersTo, 'SessionMinutesFrom' : sessionMinutesFrom,
        'SessionMinutesTo' : sessionMinutesTo, 'AgeFrom' : ageFrom, 'YearReleased' : yearReleased
      })
        .subscribe(res => console.log(res) );
    }

    updateGame (game: Game): Observable<any> {
      return this.http.post(this.gamesUrl, game);
    }

    //  getData() {
    //   return this.http.get<any>('https://tabletop-api-dev.azurewebsites.net/api/games',{headers: this.headers})
    //   .subscribe(res => {localStorage.setItem('game', JSON.stringify(res));});
    // }
    
}