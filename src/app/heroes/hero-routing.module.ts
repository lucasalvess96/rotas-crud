import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroDetailService } from './hero-detail/hero-detail.service';
import { HeroListComponent } from './hero-list/hero-list.component';

const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { 
    path: 'hero/:id', 
    component: HeroDetailComponent, 
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    canLoad: [AuthGuard],
    resolve:{
      hero: HeroDetailService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }
