import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiURL = 'https://localhost:44380/api/';

  constructor(public http: Http) {

  }

  public post(id, comments) {
    return this.http.post(`${this._apiURL}/movie/${id}/comment`, comments)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

}
