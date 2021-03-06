import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from './../shared';
import { AdminGuard } from './../shared/guard/admin.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'catalog', loadChildren: './catalog/catalog.module#CatalogModule'},
            { path: 'basket', loadChildren: './basket/basket.module#BasketModule', canActivate: [AuthGuard]},
            { path: 'gestion', loadChildren: './gestion/gestion.module#GestionModule', canActivate: [AuthGuard, AdminGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
