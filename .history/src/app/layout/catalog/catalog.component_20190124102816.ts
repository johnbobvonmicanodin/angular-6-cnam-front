import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProductService } from 'src/app/_services/product.service';
import { NgModel } from '@angular/forms';
import { BasketService } from 'src/app/_services/basket.service';
import { Basket } from 'src/app/models/basket';
import { User } from 'src/app/models/user';
import { MovementService } from 'src/app/_services/movement.service';
import { InventoryService } from 'src/app/_services/inventory.service';
import { Inventory } from 'src/app/models/inventory';
import { Movement } from 'src/app/models/movement';

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

    currentUser: User = new User();

    onCatalog = true;
    onDetails = false;
    onUpdate = false;
    isASeller = false;
    isLog = false;
    isUp = false;
    isForward = false;

    inventoryOfSelectedItem: any;
    stockToAdd = 0;

    constructor(private productService: ProductService,
                private basketService: BasketService,
                private movementService: MovementService,
                private inventoryService: InventoryService) {}

    ngOnInit() {
        if (localStorage.getItem('isSeller') === '1') {
            this.isASeller = true;

            this.currentUser.Id = localStorage.getItem('id');

            this.productService.getallProducts().subscribe(data => {
                this.productList = data;
            });
        } else {

            this.productService.getallProductsUp().subscribe(data => {
                this.productList = data;
            });
        }

    }

    gotoDetails(item) {
        this.selectedItem = item;

        this.inventoryService.getLast(this.selectedItem).subscribe(data => {
            this.inventoryOfSelectedItem = data;
            this.onCatalog = false;
            this.onDetails = true;
        });
    }

    gotoUpdate(item) {
        this.selectedItem = item;

        this.inventoryService.getLast(this.selectedItem).subscribe(data => {
            console.log(data);
            this.inventoryOfSelectedItem = data;
            this.onCatalog = false;
            this.onUpdate = true;
        });
    }

    goBack() {
        this.inventoryOfSelectedItem = null;
        this.stockToAdd = 0;
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

    setActive() {
        this.productService.setProductUp(this.selectedItem).subscribe(data => {
            this.isUp = true;
            setTimeout(() => this.isUp = false, 2000);
        });
    }

    setForward() {
        this.productService.setProductForward(this.selectedItem).subscribe(data => {
            this.isForward = true;
            setTimeout(() => this.isForward = false, 2000);
        });
    }

    addStock() {

        if (this.stockToAdd > 0) {

            if (this.inventoryOfSelectedItem == null) {
                this.inventoryOfSelectedItem = new Inventory();
                this.inventoryOfSelectedItem.Date = new Date();
                this.inventoryOfSelectedItem.ProductStock = this.selectedItem;
                this.inventoryOfSelectedItem.Stock = this.stockToAdd;

                this.inventoryService.addInventory(this.inventoryOfSelectedItem).subscribe(data => {
                    this.inventoryOfSelectedItem = data;
                });
            } else {
                const movement = new Movement();
                movement.Date = new Date();
                movement.MovementOrigin = this.currentUser;
                movement.Type_of_movement = 'stock';
                movement.ProductMoved = this.selectedItem;
                movement.Number = this.stockToAdd;
                movement.Value = this.selectedItem.priceHT * this.stockToAdd;

                this.movementService.addMovement(movement).subscribe(data => {
                    console.log(data);
                });
            }
        }
    }

    refreshInventory() {
        /*this.inventoryService.refreshInventory(this.selectedItem).subscribe(data => {
            this.inventoryOfSelectedItem = data;
        });*/
    }

    deleteProduct() {

        const current = this;

        if (confirm('Cest vraiment pas une bonne idée, tu devrais plutôt désactiver le produit')) {

            this.productService.deleteProduct(this.selectedItem).subscribe(data => {
              this.goBack();

                current.productService.getallProducts().subscribe(rep => {
                    current.productList = rep;
                });
            });
        }
    }
}
