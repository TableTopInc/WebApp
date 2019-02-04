import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Designer} from '../models/designer';
import { Observable} from 'rxjs';
import { Location } from '@angular/common';
import { ConfigService } from './config-service';


@Injectable({ providedIn: 'root'})
export class DesignersService {

designers: Designer[] = [];

private designersUrl = this.configService.url + '/api/GameDesigners';

    constructor(private http: HttpClient, private location: Location, private configService: ConfigService) {
    }

    public headers = new HttpHeaders()
    .append('accept', 'application/json');
    getDesigners(): Observable<Designer[]>  {
      return this.http.get<Designer[]>(this.designersUrl, {headers: this.headers});
    }

    getDesigner(id: string): Observable<Designer> {
      const url = `${this.designersUrl}/${id}`;
      return this.http.get<Designer>(url);
    }

    deleteDesigner (designer: Designer | string): Observable<Designer> {
      const id = typeof designer === 'string' ? designer : designer.id;
      const url = `${this.designersUrl}/${id}`;
      return this.http.delete<Designer>(url, {headers: this.headers});
    }

    addDesigner(designer: Designer) {
      return  this.http.post<Designer>
      (this.designersUrl,
        designer, {headers: this.headers}).subscribe(result => {
          this.designers.push(result);
          this.goBack();
        });
    }

    updateDesigner(id: string, designer: Designer) {
      return this.http.post(this.designersUrl, designer, {headers: this.headers})
      .subscribe(() => this.goBack());
    }

    goBack(): void {
      this.location.back();
    }
}
