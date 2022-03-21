import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad,  CanActivate {

  constructor(private authService: AuthService,
    private router:Router) { }
    canActivate(
     route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
  return this.authService.verificaAutentificacion()
  .pipe(
      tap(estaAutentificcacion =>{
      if( !estaAutentificcacion){
        this.router.navigate(['./auth/login']);
      }
      }))
  ;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
    return this.authService.verificaAutentificacion()
    .pipe(
      tap(estaAutentificcacion =>{
      if( !estaAutentificcacion){
        this.router.navigate(['./auth/login']);
      }
      }))
    ;

  }
}
