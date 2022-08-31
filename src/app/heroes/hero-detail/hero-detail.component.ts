import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/dialog.service';
import { HeroService, Hero } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  /**
   * mmethod edit - save e cancel
   * **/
  hero$!: Hero | undefined;
  editHero$: string = '';

  /**
   * mmethod delete
   * **/
  heroes: Hero[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private dialogService: DialogService,
  ) { }


  /**
  * method SEM Resolve e canDeactive 
  **/
  // ngOnInit(): void {
  //   this.hero = this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>
  //       this.heroService.getHero(params.get('id')!))
  //   );
  // }



  /**
  * method COM Resolve e canDeactive 
  **/
  ngOnInit() {
    this.route.data
      .subscribe(data => {
        const hero: Hero = data['hero'];
        this.editHero$ = hero.name;
        this.hero$ = hero;
      });
  }

  save(): void {
    if (this.hero$) {
      this.heroService.updateHero(this.hero$)
        .subscribe(() => this.gotoHeroes());
    }
  }

  cancel(): void {
    this.gotoHeroes();
  }

  gotoHeroes(): void {
    const heroId = this.hero$ ? this.hero$.id : null;

    this.router.navigate(['/heroes', { id: heroId, params: 'paramsID' }], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.hero$ || this.hero$.name === this.editHero$) {
      return true;
    }

    return this.dialogService.confirm('confirmar alteração?');
  }

  /**
  * method delete
  **/
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id)
      .subscribe();

    this.gotoHeroes();  
  }

}
