import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { OrdersComponent } from "./orders/orders.component";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";
import { RoleGuardService as RoleGuard } from "./auth/role-guard.service";



const appRoutes: Routes = [
    {path: '', component: HomeComponent , canActivate: [AuthGuard],children: [
        {path: 'meni', component: MenuComponent, canActivate: [AuthGuard]},
    ]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
    {path: 'orders', component: OrdersComponent, canActivate: [RoleGuard, AuthGuard], data: {
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