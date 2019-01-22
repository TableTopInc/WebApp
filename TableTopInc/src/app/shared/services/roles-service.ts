import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Roles} from '../models/roles';
import {RolesData} from '../roles-data';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root'})
export class RolesService{
roles:Roles[]=RolesData;
role:Roles;

    constructor(private http: HttpClient){}

    getRoles():Observable<Roles[]>  {
      console.log(RolesData);
      return of(RolesData);  
    }

    getRole(id: string): Observable<Roles> {   
        return of(RolesData.find(role => role.id === id));
       }

    deleteGame(roles: Roles) {
        const index = this.roles.indexOf(roles);
         if (index > -1) {
           this.roles.splice(index, 1);
         }
    }

    addRole(id:string, title:string) {
        const role = new Roles(id, title, );
        this.roles.push(role);
      }
    
    
}