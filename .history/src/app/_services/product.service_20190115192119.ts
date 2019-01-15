import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _apiURL = 'https://localhost:44380/api/products';

  constructor(public http: Http) {

  }

  public login(login: Login) {

    return this.http.get(`${this._apiURL}/get`)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }


}
