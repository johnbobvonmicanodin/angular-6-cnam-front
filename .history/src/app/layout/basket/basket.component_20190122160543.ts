import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { BasketService } from 'src/app/_services/basket.service';
import { MovementService } from 'src/app/_services/movement.service';
import { User } from 'src/app/models/user';

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

    ngOnInit() {
        this.currentUser.Id = localStorage.getItem('id');

        this.basketService.getallBasketsforUser(this.currentUser).subscribe(data => {
            this.basketList = data;
            this.calculTotalPrice();
        });

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

        this.basketList.forEach(item => {
            this.totalPrice += ((item.product_choose.tva * this.indicetwo) + this.indice) * (item.product_choose.priceHT * item.number);
        });
    }
}
