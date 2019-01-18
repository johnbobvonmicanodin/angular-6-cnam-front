/* import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _apiURL = 'http://demo.capcod.eu/movies/api';

  constructor(public http: Http) {

  }

  public getAll(): Observable<any> {
      return this.http.get(`${this._apiURL}/movie`)
      .pipe(
        map((data) => {
          return data.json();
        }, (err) => {
          console.log('An error occured', err);
        })
      );
  }

  public get(id): Observable<any> {
    return this.http.get(`${this._apiURL}/movie/${id}`)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
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

  public deleteCom(idfilm, idcomment) {
    return this.http.delete(`${this._apiURL}/movie/${idfilm}/comment/${idcomment}`)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public modifyCom(idFilm, idcomm, comment) {
    return this.http.post(`${this._apiURL}/movie/${idFilm}/comment/${idcomm}`, comment)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

}
 */
