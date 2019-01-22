import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, CatalogRoutingModule, PageHeaderModule, FormsModule],
    declarations: [CatalogComponent]
})
export class ChartsModule {}
