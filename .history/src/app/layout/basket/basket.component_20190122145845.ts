import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { BasketService } from 'src/app/_services/basket.service';
import { MovementService } from 'src/app/_services/movement.service';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss'],
    animations: [routerTransition()]
})
export class BasketComponent implements OnInit {
    constructor(basketService: BasketService, movementService: MovementService) {}

    ngOnInit() {}
}
