import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  /***
   * lazy loading
   * **/
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis.module').then(m => m.CrisisModule),
    data: { preload: true }
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
