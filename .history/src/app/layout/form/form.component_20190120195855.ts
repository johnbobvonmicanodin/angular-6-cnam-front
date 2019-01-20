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

    ngOnInit() {}

    addNewProduct() {

        this.productService.addProduct(this.productToAdd).subscribe(data => {
            console.log(data);
        });

    }

    OnImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.imageToUpload = file;
        console.log(file);
        console.log(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
    }
}
