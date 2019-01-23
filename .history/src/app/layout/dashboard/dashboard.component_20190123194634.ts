import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProductService } from 'src/app/_services/product.service';

import { BasketService } from 'src/app/_services/basket.service';
import { Basket } from 'src/app/models/basket';
import { User } from 'src/app/models/user';

import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    imagesPath = 'https://localhost:44380/images/';
    imageTest = 'piano.jpg';

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
    isLog = false;
    isUp = false;
    isForward = false;


    constructor(private _productService: ProductService,  private basketService: BasketService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'A large choice of guitars',
                text:
                    'From 250€'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Drums',
                text: 'The best drums to annoy your neighbours.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'The Grove Organ',
                text:
                    'For experts only.'
            }
);



        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
}




    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    ngOnInit() {
        if (localStorage.getItem('isSeller') === '1') {
            this.isASeller = true;

            this._productService.getallProductsForward().subscribe(data => {
                this.productList = data;
            });
        } else {
            this._productService.getallProductsForward().subscribe(data => {
                this.productList = data;
            });
        }
    }



    gotoDetails() {
        location.replace('/catalog');
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

            this._productService.saveImage(formData).subscribe(data => {
                this.imageToUpload = undefined;
            });
        }

        this._productService.updateProduct(this.selectedItem).subscribe(data => {
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

    setActive() {
        this._productService.setProductUp(this.selectedItem).subscribe(data => {
            this.isUp = true;
            setTimeout(() => this.isUp = false, 2000);
        });
    }

    setForward() {
        this._productService.setProductForward(this.selectedItem).subscribe(data => {
            this.isForward = true;
            setTimeout(() => this.isForward = false, 2000);
        });
    }

}
