import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * proteje a rota hero-detail
   * **/
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  /**
   * carregue o hero-detail apenas quando o usuário estiver logado e tentar acessar a área de recursos hero-detail.
   * **/
  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }

  /**
   * verifica se o usuario ta logado
   * **/
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // cria um token
    const sessionId = 123456789;

    // permanece após navegar para outra rota. Adicione um elemento âncora para que você possa pular para um determinado ponto na página.
    // precisa fazer login apenas uma vez
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
  
}
