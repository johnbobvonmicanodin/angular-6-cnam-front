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

    currentUser: User = new User();
    basketList: any;

    ngOnInit() {
        this.currentUser.Id = localStorage.getItem('id');

        this.basketService.getallBasketsforUser(this.currentUser).subscribe(data => {
            this.basketList = data;
            console.log(data);
            console.log(data[0].basketOwner);
        });

    }
}
