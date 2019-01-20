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

  public getallProducts() {

    return this.http.get(`${this._apiURL}/get`)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public addProduct(product: Product, image: any) {

    const json = {'product' : product, 'image' : image};

    return this.http.post(`${this._apiURL}/add`, json)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public deleteProduct(product: Product) {

    return this.http.post(`${this._apiURL}/delete`, product)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );

  }


}

