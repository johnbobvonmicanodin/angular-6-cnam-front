import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GestionRoutingModule } from './gestion-routing.module';
import { GestionComponent } from './gestion.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, GestionRoutingModule, PageHeaderModule, FormsModule],
    declarations: [GestionComponent]
})
export class GestionModule {}
