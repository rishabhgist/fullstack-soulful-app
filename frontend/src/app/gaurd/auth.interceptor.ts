import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";

export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService, private router: Router) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("No-Auth") === "True") {
            return next.handle(req.clone())
        }
        
        const token = this.authService.getToken();
        this.addToken(req, token);
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                    console.log(err.status);
                    if (err.status === 401) {
                        this.router.navigate(['/login'])
                    } else if (err.status === 403) {
                        this.router.navigate(['/forbidden'])
                }
                    return throwError(()=> new Error("Something went wrong"))
                }
            )
        );
    }

    private addToken(reqest: HttpRequest<any>, token: string | null) {
        return reqest.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}