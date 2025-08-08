import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Weather } from '../../services/weather';


@Component({
  standalone:false,
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class Search {
  searchControl = new FormControl('');
  @Output() search = new EventEmitter<string>();
  filteredCities$: Observable<string[]> = of([]);
  showSuggestions = false;

  constructor(private weather: Weather) {
    this.filteredCities$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
     filter((value): value is string => value !== null && value.trim() !== ''), // <-- filters out null and empty
  switchMap(value => this.weather.getCitySuggestions(value))
    );
  }

  selectCity(city: string) {
    this.searchControl.setValue(city);
    this.showSuggestions = false;
    this.search.emit(city);
  }

  onBlur() {
    // Delay hiding suggestions so click event can register
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}
