import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Designer} from '../models/designer';
import {DesignersData} from '../designers-data';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root'})
export class DesignersService{
designers:Designer[]=DesignersData;


    constructor(private http: HttpClient){}

    public headers = new HttpHeaders()
     .append('accept', 'application/json');
     
    getDesigners():Observable<Designer[]>  {
      console.log(this.designers);
      return of(DesignersData);  
    }

    getDesigner(id: string): Observable<Designer> {   
        return of(DesignersData.find(designer => designer.id === id));
       }

    deleteDesigners(designers: Designer) {
        const index = this.designers.indexOf(designers);
         if (index > -1) {
           this.designers.splice(index, 1);
         }
    }

    addDesigner(id:string, firstName:string, lastName:string, bio:string, photoUrl:string) {
        const designers = new Designer(id, firstName, lastName, bio, photoUrl);
        this.designers.push(designers);
      }
    
}