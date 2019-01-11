import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiURL = 'https://localhost:44380/api/users';

  constructor(public http: Http) {

  }

  public login(Login l) {
    return this.http.post(`${this._apiURL}/users/login`, comments)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

}
