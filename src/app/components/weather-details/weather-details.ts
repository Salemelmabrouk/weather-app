import { Component, Input } from '@angular/core';
import { WeatherData } from '../../services/weather';

@Component({
  selector: 'app-weather-details',
  standalone: false,
  templateUrl: './weather-details.html',
  styleUrl: './weather-details.css'
})
export class WeatherDetails {
  @Input() weatherData: WeatherData | null = null;
}
