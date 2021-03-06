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

  public getallProductsUp() {

    return this.http.get(`${this._apiURL}/getallup`)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public getallProductsForward() {

    return this.http.get(`${this._apiURL}/getallforward`)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public addProduct(product: Product) {

    return this.http.post(`${this._apiURL}/add`, product)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public saveImage(formData: any) {

    return this.http.post(`${this._apiURL}/addimage`, formData)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }

  public updateProduct(product: Product) {

    return this.http.post(`${this._apiURL}/update`, product)
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

  public setProductUp(product: Product) {

    return this.http.post(`${this._apiURL}/setup`, product)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }


  public setProductForward(product: Product) {

    return this.http.post(`${this._apiURL}/setforward`, product)
    .pipe(
      map((data) => {
        return data.json();
      }, (err) => {
        console.log('An error occured', err);
      })
      );
  }


}

