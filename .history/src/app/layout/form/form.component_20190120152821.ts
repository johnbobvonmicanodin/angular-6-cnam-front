import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    constructor(private productService: ProductService) {}

    productToAdd = new Product();

    ngOnInit() {}

    addNewProduct() {

        this.productService.addProduct(this.productToAdd).subscribe(data => {
            console.log(data);
        });

    }
}
