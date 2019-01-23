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
export class MovementService {

  private _apiURL = 'https://localhost:44380/api/movements';

  constructor(public http: Http) {

  }

  public getallMovementforAProduct(product: Product) {

    return this.http.post(`${this._apiURL}/getalloneproduct`, product)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public getallMovementforAProductAfterInventory(product: Product) {

    return this.http.post(`${this._apiURL}/getalloneproductafterlastinventory`, product)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public getallforOneUser(user: User) {

    return this.http.post(`${this._apiURL}/getallforuser`, user)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public getallPurchase() {

    return this.http.get(`${this._apiURL}/getallforuser`)
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

}

