import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProductService } from 'src/app/_services/product.service';

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

    constructor(private _productService: ProductService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'A large choice of guitars',
                text:
                    'From 50,99€'
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
                    'Yes, we also sell organs because why not ?'
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

    ngOnInit() {
        this._productService.getallProducts().subscribe(data => {
            console.log(data);
        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
