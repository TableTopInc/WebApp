import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Roles} from '../models/roles';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ConfigService } from './config-service';

@Injectable({ providedIn: 'root'})
export class RolesService {
roles: Roles[] = [];

private rolesUrl = this.configService.url + '/api/GameDesignerRoles';

    constructor(private http: HttpClient, private location: Location, private configService: ConfigService) {
      this.getRoles();
    }

    public headers = new HttpHeaders()
     .append('accept', 'application/json');

    getRoles(): Observable<Roles[]>  {
      return this.http.get<Roles[]>(this.rolesUrl, {headers: this.headers});
    }

    getRole(id: string): Observable<Roles> {
      const url = `${this.rolesUrl}/${id}`;
      return this.http.get<Roles>(url);
    }

    deleteRole (role: Roles | string): Observable<Roles> {
      const id = typeof role === 'string' ? role : role.id;
      const url = `${this.rolesUrl}/${id}`;
      return this.http.delete<Roles>(url, {headers: this.headers});
    }

    addRole(role: Roles) {
      return  this.http.post<Roles>
      (this.rolesUrl,
        role, {headers: this.headers}).subscribe(result => {
          this.roles.push(result);
          this.goBack();
        });
    }

    updateRole(id: string, role: Roles) {
      return this.http.post(this.rolesUrl, role, {headers: this.headers})
      .subscribe(() => this.goBack());
  }

    goBack(): void {
      this.location.back();
  }
}
