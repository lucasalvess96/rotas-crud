import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroModule } from './heroes/hero.module';

import { NotfoundComponent } from './notfound/notfound.component';
import { AuthModule } from './auth/auth.module';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisModule } from './crisis-center/crisis.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    CrisisCenterComponent
  ],
  imports: [
    BrowserModule,
    HeroModule,
    AuthModule,
    CrisisModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
