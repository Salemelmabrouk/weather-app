import { Component, Input } from '@angular/core';
import { WeatherData } from '../../services/weather';
@Component({
  selector: 'app-weather-card',
  standalone: false,
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css'
})
export class WeatherCard {
  @Input() weatherData: WeatherData | null = null;
}
