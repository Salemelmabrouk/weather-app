import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private apiKey = '695ed9f29c4599b7544d0db5c211d499';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  private weatherDataSubject = new BehaviorSubject<WeatherData | null>(null);
  weatherData$ = this.weatherDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<WeatherData> {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherData>(url).pipe(
      map(data => {
        this.weatherDataSubject.next(data);
        return data;
      })
    );
  }
getCitySuggestions(query: string): Observable<string[]> {
  if (!query.trim()) {
    return of([]);
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`;

  return this.http.get<any[]>(url).pipe(
    map(results =>
      results.map(city =>
        `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`
      )
    )
  );
}
  getWeatherByLocation(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<WeatherData>(url).pipe(
      map(data => {
        this.weatherDataSubject.next(data);
        return data;
      })
    );
  }
}
