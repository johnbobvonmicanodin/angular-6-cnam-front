import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Basket } from '../models/basket';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _apiURL = 'https://localhost:44380/api/baskets';

  constructor(public http: Http) {

  }

  public getallBasketsforUser(user: User) {

    return this.http.post(`${this._apiURL}/getforuser`, user)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public addBasket(basket: Basket) {

    return this.http.post(`${this._apiURL}/add`, basket)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public deleteBasket(id) {

    return this.http.delete(`${this._apiURL}/delete`, id)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );

  }


}
