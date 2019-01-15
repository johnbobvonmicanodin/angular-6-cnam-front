import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../models/login';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiURL = 'https://localhost:44380/api/users';

  constructor(public http: Http) {

  }

  public login(login: Login) {

    return this.http.post(`${this._apiURL}/login`, login)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public addUser(user: User) {

    return this.http.post(`${this._apiURL}/add`, user)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public deleteUser(idUser) {

    return this.http.delete(`${this._apiURL}/delete`, idUser)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public modifyUser(userbefore: User, userafter: User) {
    const json = {'userbefore': userbefore, 'userafter': userafter};

    return this.http.post(`${this._apiURL}/modify`, json)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }




}
