import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProductService } from 'src/app/_services/product.service';
import { NgModel } from '@angular/forms';
import { BasketService } from 'src/app/_services/basket.service';
import { Basket } from 'src/app/models/basket';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    animations: [routerTransition()]
})
export class CatalogComponent implements OnInit {

    productList = [];
    iterator = 0;
    urlServer = 'https://localhost:44380/images/';

    numberToBuy = 1;

    selectedItem: any;
    imageToUpload: any;

    onCatalog = true;
    onDetails = false;
    onUpdate = false;
    isASeller = false;

    constructor(private productService: ProductService, private basketService: BasketService) {}

    ngOnInit() {
        if (localStorage.getItem('isSeller') === '1') {
            this.isASeller = true;
        }

        this.productService.getallProducts().subscribe(data => {
            this.productList = data;
            // console.log(data);
        });
    }

    gotoDetails(item) {
        this.selectedItem = item;
        this.onCatalog = false;
        this.onDetails = true;
    }

    gotoUpdate(item) {
        this.selectedItem = item;
        this.onCatalog = false;
        this.onUpdate = true;
    }

    goBack() {
        this.onDetails = false;
        this.onUpdate = false;
        this.onCatalog = true;
    }

    addToBasket() {

        const user = new User();
        user.Id = localStorage.getItem('id');

        const basketToAdd = new Basket();
        basketToAdd.Product_choose = this.selectedItem;
        basketToAdd.BasketOwner = user;
        basketToAdd.Number = this.numberToBuy;

        this.basketService.addBasket(basketToAdd).subscribe(data => {
            // let it go
        });

        this.numberToBuy = 1;

        this.goBack();
    }

    updateProduct() {

        if (this.imageToUpload !== undefined) {
            this.selectedItem.picture = this.imageToUpload.name;

            const formData = new FormData();
            formData.append(this.imageToUpload.name, this.imageToUpload);

            this.productService.saveImage(formData).subscribe(data => {
                this.imageToUpload = undefined;
            });
        }

        this.productService.updateProduct(this.selectedItem).subscribe(data => {
            alert('update done');
        });
    }

    OnImagePicked($event) {
        const file = (event.target as HTMLInputElement).files[0];

        if (file != null) {
            this.imageToUpload = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
         }
    }
}
