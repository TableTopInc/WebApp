import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Roles} from '../models/roles';
import { Observable, of } from 'rxjs';



@Injectable({ providedIn: 'root'})
export class RolesService{
roles:Roles[]=[];
role:Roles;

private rolesUrl = 'https://tabletop-api-dev.azurewebsites.net/api/GameDesignerRoles';

    constructor(private http: HttpClient){
      this.getRoles();
    }

    public headers = new HttpHeaders()
     .append('accept', 'application/json');

     getRoles():Observable<Roles[]>  {
      return this.http.get<Roles[]>('https://tabletop-api-dev.azurewebsites.net/api/GameDesignerRoles',{headers: this.headers}) 
    }

    //  getRole(id: string): Observable<Roles> {   
    //      return of(RolesData.find(role => role.id === id));
    //     }

    deleteRole (role: Roles | string): Observable<Roles> {
      const id = typeof role === 'string' ? role : role.Id;
      const url = `${this.rolesUrl}/${id}`;
   
      return this.http.delete<Roles>(url, {headers: this.headers});
    }

    addRole(Id:string, Title:string) {
        const role = new Roles(Id, Title, );
        this.roles.push(role);
        return this.http.post<any>
      ('https://tabletop-api-dev.azurewebsites.net/api/GameDesignerRoles',
        {'Id': Id, 'Title': Title}, {headers: this.headers})
        .subscribe(res => console.log(res) );
    }
    
    
}