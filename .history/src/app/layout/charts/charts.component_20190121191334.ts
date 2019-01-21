import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProductService } from 'src/app/_services/product.service';
import { NgModel } from '@angular/forms';

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

    selectedItem: any;
    imageToUpload: any;

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

    updateProduct() {

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
