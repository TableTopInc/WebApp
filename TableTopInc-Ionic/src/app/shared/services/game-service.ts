import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../models/game';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ConfigService } from './config-service';


@Injectable({ providedIn: 'root'})
export class GameService {

games: Game[] = [];


private gamesUrl = this.configService.url + '/api/games';
// private gamesUrl = 'http://localhost:3000/api/games';

    constructor(private http: HttpClient, private location: Location, private configService: ConfigService) {}

    public headers = new HttpHeaders().append('accept', 'application/json');

    getGames(): Observable<Game[]> {
      return this.http.get<Game[]>(this.gamesUrl, {headers: this.headers});
    }

    getGame(id: string): Observable<Game> {
      const url = `${this.gamesUrl}/${id}`;
      return this.http.get<Game>(url);
    }

    deleteGame (game: Game | string): Observable<Game> {
      const id = typeof game === 'string' ? game : game.id;
      const url = `${this.gamesUrl}/${id}`;
      return this.http.delete<Game>(url, {headers: this.headers});
    }

    addGame(game: Game) {
      return  this.http.post<Game>
      (this.gamesUrl,
        game, {headers: this.headers}).subscribe(result => {
          this.games.push(result);
          this.goBack();
        });
    }

    updateGame(id: string, game: Game) {
      return this.http.post(this.gamesUrl, game, {headers: this.headers})
      .subscribe(() => this.goBack());
    }

    goBack(): void {
      this.location.back();
    }
}
