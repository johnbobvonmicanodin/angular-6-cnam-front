import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Basket } from '../models/basket';
import { Movement } from '../models/movement';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _apiURL = 'https://localhost:44380/api/inventories';

  constructor(public http: Http) {

  }

  public getallMovementforAProduct(product: Product) {

    return this.http.post(`${this._apiURL}/getforproduct`, process)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public addMovement(movement: Movement) {

    return this.http.post(`${this._apiURL}/add`, movement)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public deleteMovement(id) {

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
