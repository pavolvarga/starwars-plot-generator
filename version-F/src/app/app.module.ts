import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ResultPageComponent } from './result/result-page/result-page.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResultPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
