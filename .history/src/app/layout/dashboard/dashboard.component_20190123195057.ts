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

    productList = [];
    iterator = 0;
    urlServer = 'https://localhost:44380/images/';

    selectedItem: any;

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
        this._productService.getallProductsForward().subscribe(data => {
            this.productList = data;
        });

    }

    gotoDetails() {
        location.replace('/catalog');
    }

}
