import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Roles} from '../models/roles';
import { Observable } from 'rxjs';



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
      return this.http.get<Roles[]>(this.rolesUrl,{headers: this.headers}) 
    }

    getRole(id: string): Observable<Roles> {
      const url = `${this.rolesUrl}/${id}`;
      return this.http.get<Roles>(url)
    }

    deleteRole (role: Roles | string): Observable<Roles> {
      const id = typeof role === 'string' ? role : role.id;
      const url = `${this.rolesUrl}/${id}`;
      return this.http.delete<Roles>(url, {headers: this.headers});
    }

    addRole(id:string, title:string) {
      const role = new Roles(id, title);
      this.roles.push(role);
      return  this.http.post<Roles>
      (this.rolesUrl,
        {'id': id, 'title': title}, {headers: this.headers});
    }

    updateRole(id: string, role: Roles) {
      const urlParams = new HttpParams().set("id", id.toString());
      return this.http.post(this.rolesUrl, role, { params: urlParams});
  }
       
}