import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ResultPageComponent } from './result/result-page/result-page.component';
import { HeaderComponent } from './common/header/header.component';
import { StarWarsSearchComponent } from './common/star-wars-search/star-wars-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResultPageComponent,
    HeaderComponent,
    StarWarsSearchComponent,
  ],
  imports: [
    AutocompleteLibModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
