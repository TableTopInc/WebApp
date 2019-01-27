import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Designer} from '../models/designer';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root'})
export class DesignersService{
designers:Designer[]=[];
designer:Designer;

private designersUrl = 'https://tabletop-api-dev.azurewebsites.net/api/GameDesigners';

    constructor(private http: HttpClient){
      this.getDesigners
    }

    public headers = new HttpHeaders()
    .append('accept', 'application/json');
     
    getDesigners():Observable<Designer[]>  {
      return this.http.get<Designer[]>(this.designersUrl,{headers: this.headers})  
    }

    getDesigner(id: string): Observable<Designer> {
      const url = `${this.designersUrl}/${id}`;
      return this.http.get<Designer>(url)
    }

    deleteDesigner (designer: Designer | string): Observable<Designer> {
      const id = typeof designer === 'string' ? designer : designer.id;
      const url = `${this.designersUrl}/${id}`;
      return this.http.delete<Designer>(url, {headers: this.headers});
    }

    addDesigner(id:string, firstName:string, lastName:string, bio:string, photoUrl:string) {
      const designer = new Designer(id, firstName, lastName, bio, photoUrl);
      this.designers.push(designer);
      return  this.http.post<Designer>
      (this.designersUrl,
        {'id': id, 'firstName': firstName, 'lastName': lastName, 'bio': bio,
        'photoUrl' : photoUrl}, {headers: this.headers});
    }

    updateDesigner(id: string, designer: Designer) {
      const urlParams = new HttpParams().set("id", id.toString());
      return this.http.post(this.designersUrl, designer, { params: urlParams});
    }
   
    
}