import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { BasketService } from 'src/app/_services/basket.service';
import { MovementService } from 'src/app/_services/movement.service';
import { User } from 'src/app/models/user';
import { Movement } from 'src/app/models/movement';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss'],
    animations: [routerTransition()]
})
export class BasketComponent implements OnInit {
    constructor(private basketService: BasketService, private movementService: MovementService) {}

    urlServer = 'https://localhost:44380/images/';
    currentUser: User = new User();
    basketList: any;
    indice = 1;
    indicetwo = 0.01;
    totalPrice = 0;
    pastPurchases: any;

    isOnPayment = false;

    ngOnInit() {
        this.currentUser.Id = localStorage.getItem('id');

        this.updateLists();
    }

    deleteArticle(item: any) {
        const current = this;

        this.basketService.deleteBasket(item).subscribe(data => {
            this.basketService.getallBasketsforUser(this.currentUser).subscribe(data => {
                current.basketList = data;
                current.calculTotalPrice();
            });
        });
    }

    calculTotalPrice() {
        this.totalPrice = 0;

        this.basketList.forEach(item => {
            this.totalPrice += ((item.product_choose.tva * this.indicetwo) + this.indice) * (item.product_choose.priceHT * item.number);
        });
    }

    pay() {
        const current = this;

        this.basketList.forEach(item => {
            const m = new Movement;
            m.MovementOrigin = this.currentUser;
            m.ProductMoved = item.product_choose;
            m.Number = item.number;
            m.Statut = 'Shipping';
            m.Type_of_movement = 'purchase';
            m.Value = ((item.product_choose.tva * this.indicetwo) + this.indice) * (item.product_choose.priceHT * item.number);
            m.Date = new Date();

            this.movementService.addMovement(m);
        });

        this.basketService.deleteAllBasketForUser(this.currentUser).subscribe(data => {
           current.updateLists();
        });

        this.goBack();
    }

    goToPayment() {
        this.isOnPayment = true;
    }

    goBack() {
        this.isOnPayment = false;
    }

    updateLists() {
        this.basketService.getallBasketsforUser(this.currentUser).subscribe(data => {
            this.basketList = data;
            this.calculTotalPrice();
        });

        this.movementService.getallforOneUser(this.currentUser).subscribe(data => {
            this.pastPurchases = data;
        });
    }
}
