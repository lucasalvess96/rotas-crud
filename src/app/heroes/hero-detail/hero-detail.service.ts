import { Injectable } from '@angular/core';

import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HeroService, Hero } from '../hero.service';

@Injectable({
  providedIn: 'root'
})
export class HeroDetailService {

  constructor(private heroService: HeroService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hero> | Observable<never> {
    const id = route.paramMap.get('id')!;

    return this.heroService.getHero(id).pipe(
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);
        } else { // id not found
          this.router.navigate(['/heroes']);
          return EMPTY;
        }
      })
    );
  }
}
