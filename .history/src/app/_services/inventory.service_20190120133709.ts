import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Basket } from '../models/basket';
import { Movement } from '../models/movement';
import { Inventory } from '../models/inventory';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private _apiURL = 'https://localhost:44380/api/inventories';

  constructor(public http: Http) {

  }

  public getallLastInventory() {

    return this.http.get(`${this._apiURL}/getalllast`)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public addInventory(inventory: Inventory) {

    return this.http.post(`${this._apiURL}/add`, inventory)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public deleteInventory(id) {

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
