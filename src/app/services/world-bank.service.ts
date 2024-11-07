import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {

  constructor(private http:HttpClient) { }

  // I could make only one method and pass the indicator as a parameter, but I think this way
  // it's easier to manipulate data if needed

  // economic
  getGdp():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getGdpPerCapita():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getGdpPerCapitaPpp():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.PP.CD?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getGdpGrowth():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.KD.ZG?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getGdpPppGrowth():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.KD.ZG?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getInflation():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/FP.CPI.TOTL.ZG?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getUnemployment():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/SL.UEM.TOTL.ZS?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  // population
  getMigration():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/SM.POP.NETM?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getFertility():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/SP.DYN.TFRT.IN?format=json&date=2022&per_page=300`).pipe(catchError(this.handleError));
  }

  getPopulation():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2023&per_page=300`).pipe(catchError(this.handleError));
  }

  getPopulationDensity():Observable<Object> {
    return this.http.get(`https://api.worldbank.org/v2/country/all/indicator/EN.POP.DNST?format=json&date=2021&per_page=300`).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.error('WorldBank API error');
    return throwError(() => new Error('WorldBank API error'));
  }
}
