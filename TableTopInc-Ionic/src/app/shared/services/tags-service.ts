import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GroupTag } from '../models/group-tag';
import { Tag } from '../models/tag';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ConfigService } from './config-service';


@Injectable({ providedIn: 'root'})
export class TagsService {

groups: GroupTag[] = [];
tags: Tag[] = [];


private groupsUrl = this.configService.url + '/api/tagGroups';
private tagsUrl = this.configService.url + '/api/tags';

    constructor(private http: HttpClient, private location: Location, private configService: ConfigService) {}

    public headers = new HttpHeaders().append('accept', 'application/json');

    getAllGroup(): Observable<GroupTag[]> {
      return this.http.get<GroupTag[]>(this.groupsUrl, {headers: this.headers});
    }

    getTags(): Observable<Tag[]> {
      return this.http.get<Tag[]>(this.tagsUrl, {headers: this.headers});
    }

    getTag(id: string): Observable<Tag> {
      const url = `${this.tagsUrl}/${id}`;
      return this.http.get<Tag>(url);
    }

    addTag (tag: Tag) {
      return  this.http.post<Tag>
      (this.tagsUrl,
        tag, {headers: this.headers}).subscribe(result => {
          this.tags.push(result);
          this.goBack();
        });
    }

    updateTag (id: string, tag: Tag) {
      return this.http.post(this.tagsUrl, tag, {headers: this.headers})
      .subscribe(() => this.goBack());
    }

    getGroup(id: string): Observable<GroupTag> {
      const url = `${this.groupsUrl}/${id}`;
      return this.http.get<GroupTag>(url);
    }

    deleteGroup (group: GroupTag | string): Observable<GroupTag> {
      const id = typeof group === 'string' ? group : group.id;
      const url = `${this.groupsUrl}/${id}`;
      return this.http.delete<GroupTag>(url, {headers: this.headers});
    }

    deleteTag (tag: Tag | string): Observable<Tag> {
      const id = typeof tag === 'string' ? tag : tag.id;
      const url = `${this.tagsUrl}/${id}`;
      return this.http.delete<Tag>(url, {headers: this.headers});
    }

    addGroup (group: GroupTag) {
      return  this.http.post<GroupTag>
      (this.groupsUrl,
        group, {headers: this.headers});
    }

    updateGroup (id: string, group: GroupTag) {
      return this.http.post(this.groupsUrl, group, {headers: this.headers})
      .subscribe(() => this.goBack());
    }

    goBack(): void {
      this.location.back();
    }
}
