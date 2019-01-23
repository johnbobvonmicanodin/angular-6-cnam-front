import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/_services/product.service';
import { NgModel } from '@angular/forms';
import { InventoryService } from 'src/app/_services/inventory.service';
import { Inventory } from 'src/app/models/inventory';

@Component({
    selector: 'app-gestion',
    templateUrl: './gestion.component.html',
    styleUrls: ['./gestion.component.scss'],
    animations: [routerTransition()]
})
export class GestionComponent implements OnInit {
    constructor(private productService: ProductService, private inventoryService: InventoryService) {}

    productToAdd = new Product();
    imageToUpload: any;
    productLabel: string;
    productDescription: string;
    productPrice: any;
    productTVA: any;
    productPlace: any;
    productDeliveryTime: any;
    productImageTitle: any;
    productForward = 0;
    productActive = 0;

    inventoryToAdd = new Inventory();

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
            this.productToAdd.Up = this.productActive;
            this.productToAdd.Forward = this.productForward;

            this.resetProductForm();

            this.productService.saveImage(formData).subscribe(data => {
                console.log(data);
            });

            this.productService.addProduct(this.productToAdd).subscribe(data => {
                console.log(data);
            });
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
