import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

import { HeroService, Hero } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  heroName: string = '';
  heroNameSearch: string = '';

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /**
   * Method Get(getAll)
  **/
   getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => (this.heroes = heroes));
  }

  /**
   * Method add
  **/
   add(name: string): void{
    name = name.trim();

    if(!name){
      return;
    }
    
    const newHero: Hero = { name } as Hero;

    this.heroService.addHero(newHero)
      .subscribe(hero => this.heroes.push(hero));
  }

  /**
   * Method Search
  **/
  search(searchTerm: string): void {
    if (searchTerm) {
      this.heroService
        .searchHeroes(searchTerm)
        .subscribe(heroes => (this.heroes = heroes));
    } else {
      this.getHeroes();
    }
  }

}
