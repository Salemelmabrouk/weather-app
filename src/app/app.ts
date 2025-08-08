import { Component, inject } from '@angular/core';
import { Weather } from './services/weather';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
standalone:false,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],

})
export class App {
  protected title = 'weather-app';
  private weather = inject(Weather);
  weatherData$ = this.weather.weatherData$;
  error: string | null = null;

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.weather.getWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude
          ).subscribe({
            error: (err: any) => this.error = 'Error fetching weather data'
          });
        },
        () => {
          this.weather.getWeatherByCity('London').subscribe({
            error: (err: any) => this.error = 'Error fetching weather data'
          });
        }
      );
    } else {
      this.weather.getWeatherByCity('London').subscribe({
        error: (err: any) => this.error = 'Error fetching weather data'
      });
    }
  }

  onSearch(city: string) {
    this.weather.getWeatherByCity(city).subscribe({
      error: (err: any) => this.error = 'City not found'
    });
  }
}
