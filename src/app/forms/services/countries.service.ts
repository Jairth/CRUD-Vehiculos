import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  apiRest = 'https://restcountries.com/v3.1'

  private readonly http = inject(HttpClient)

  getCountries(): Observable<any> {
    const url = `${this.apiRest}/region/america`;
    return this.http.get<any>(url)
  }
}
