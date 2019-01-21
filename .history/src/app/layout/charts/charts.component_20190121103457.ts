import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProductService } from 'src/app/_services/product.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {

    productList = [];
    iterator = 0;
    urlServer = 'https://localhost:44380/images/';

    constructor(private productService: ProductService) {}

    ngOnInit() {

        this.productService.getallProducts().subscribe(data => {
            this.productList = data;
        });
    }
}
