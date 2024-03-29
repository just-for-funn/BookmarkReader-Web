import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { UserDto } from './user-dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BookmarkService {

  constructor(private http: HttpClient) {

  }

  delete(googleId:string , bookmark: string): Observable<UserDto> {
    console.log("preparing to delete " , bookmark);
    let url = `/backend/users/${googleId}/delete-bookmarks`;
    let request = new HttpRequest("DELETE",url,{body: [bookmark]});
    return this.http.post<UserDto>(url ,[bookmark] );
  }

  getBookmarks(googleId: string): Observable<string[]> {
    const url = `/backend/users/${googleId}`;
    return this.http.get<UserDto>(url)
      .pipe(map(user => user.bookmarks));
  }

  add(googleId:string , urls:string[]):Observable<UserDto> {
    let endPoint = `/backend/users/${googleId}/bookmarks`;
    return this.http.post<UserDto>(endPoint , urls);
  }
}
