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

    selectedItem;

    onCatalog = true;
    onDetails = false;
    onUpdate = false;

    isASeller = false;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        if (localStorage.getItem('isSeller') === '1') {
            this.isASeller = true;
        }

        this.productService.getallProducts().subscribe(data => {
            this.productList = data;
            console.log(data);
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
        // yes
    }
}
