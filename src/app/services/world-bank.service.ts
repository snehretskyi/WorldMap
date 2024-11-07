import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {

  constructor(private http:HttpClient) { }

  getGdp():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getGdpPerCapita():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getGdpPerCapitaPpp():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.PP.CD?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getPopulation():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.error('WorldBank API error');
    return throwError(() => new Error('WorldBank API error'));
  }
}
