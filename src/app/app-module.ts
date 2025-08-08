import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';

import { WeatherCard } from './components/weather-card/weather-card';
import { Search } from './components/search/search';
import { WeatherDetails } from './components/weather-details/weather-details';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { App } from './app';
 import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    App,
    WeatherCard,
    Search,
    WeatherDetails
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
