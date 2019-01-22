import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss'],
    animations: [routerTransition()]
})
export class BasketComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
