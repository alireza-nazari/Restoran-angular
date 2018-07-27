import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
        HttpInterceptor,
        HttpHandler,
        HttpEvent,
        HttpRequest

} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
        request = request.clone({
            setHeaders: {
                Authorization: `${this.auth.getToken()}`
            }
        });
        return next.handle(request);
    }
}