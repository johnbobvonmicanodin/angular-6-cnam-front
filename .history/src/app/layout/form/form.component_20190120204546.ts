import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/_services/product.service';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    constructor(private productService: ProductService) {}

    productToAdd = new Product();
    imageToUpload: any;
    productLabel: string;
    productDescription: string;
    productPrice: any;
    productTVA: any;
    productPlace: any;
    productDeliveryTime: any;
    productImageTitle: any;

    ngOnInit() {}

    addNewProduct() {

        if (this.imageToUpload !== undefined) {

            const formData = new FormData();
            formData.append(this.imageToUpload.name, this.imageToUpload);

            this.productToAdd.Name = this.productLabel;
            this.productToAdd.Description = this.productDescription;
            this.productToAdd.Picture = this.imageToUpload.name;
            this.productToAdd.PriceHT = this.productPrice;
            this.productToAdd.TVA = this.productTVA;
            this.productToAdd.Stock_place = this.productPlace;
            this.productToAdd.Delivery_time = this.productDeliveryTime;

            this.resetProductForm();

            this.productService.saveImage(formData).subscribe(data => {
                console.log('hello world');
            });

            /*this.productService.addProduct(this.productToAdd).subscribe(data => {
                console.log(data);
            });*/
        }

    }

    OnImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];

        if (file != null) {
            this.imageToUpload = file;
            console.log(file);
            console.log(file.name);
            const reader = new FileReader();
            reader.readAsDataURL(file);
         }
    }

    resetProductForm() {
        this.productLabel = undefined;
        this.productDescription = undefined;
        this.imageToUpload = undefined;
        this.productPrice = undefined;
        this.productTVA = undefined;
        this.productPlace = undefined;
        this.productDeliveryTime = undefined;
    }
}
