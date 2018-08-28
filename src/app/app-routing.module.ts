import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { OrdersComponent } from "./orders/orders.component";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";
import { RoleGuardService as RoleGuard } from "./auth/role-guard.service";
import { CrudComponent } from "./crud/crud.component";
import { CategoriesComponent } from './categories/categories.component';
import { CarthComponent } from './carth/carth.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent , canActivate: [AuthGuard], children: [
            {path: ':id/meni', component: MenuComponent, canActivate: [AuthGuard]}
    ]},
    
    {path: 'carth', component: CarthComponent, canActivate: [AuthGuard], children: [
    ]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
    {path: 'orders', component: OrdersComponent, canActivate: [RoleGuard, AuthGuard], data: {
        role: 'admin'
    }},
    {path: 'crud', component: CrudComponent, canActivate: [RoleGuard, AuthGuard], data: {
        role: 'admin'
    }},
    {path: 'login', component: AuthComponent},
    {path: '**', redirectTo: '' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{
    
}