import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { OrdersComponent } from './orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';


import { HttpModule } from '@angular/http';
import { MealsService } from './meals.service';
import { ItemComponent } from './menu/item/item.component';
import { SearchService } from './search.service';

import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthGuardService } from './auth/auth-guard.service';
import { JwtHelperService as _JwtHelperService } from '@auth0/angular-jwt';
import { RoleGuardService } from './auth/role-guard.service';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StatusService } from './auth/status.service';
import { SrcValueDirective } from './menu/src-value.directive';

export const JwtHelperService  = {
  provide: _JwtHelperService,
  useFactory: () => {
    return new _JwtHelperService();
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    HeaderComponent,
    OrdersComponent,
    ItemComponent,
    AuthComponent,
    SrcValueDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    MealsService,
    SearchService,
    AuthService,
    AuthGuardService,
    JwtHelperService,
    RoleGuardService,
    StatusService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
