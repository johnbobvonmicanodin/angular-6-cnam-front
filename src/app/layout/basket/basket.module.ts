import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, BasketRoutingModule, PageHeaderModule],
    declarations: [BasketComponent]
})
export class BasketModule {}
