import { Country } from './../interface/country';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError, tap, of  } from 'rxjs'
import { CacheStore } from '../interface/cache-store.interface';
import { region } from '../interface/region.types';




@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    private saveLocalStorage (){
        localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
    }
    private loadLocalStorage (){
        if( !localStorage.getItem('cacheStorage')) return;
        this.cacheStore =  JSON.parse(localStorage.getItem('cacheStorage')!);
    }
    public cacheStore: CacheStore = {
        byCapital: {term: '', countries: []},
        byCountries: {term: '', countries: []},
        byRegion: {region: '', countries: []}
    }

    constructor(private http: HttpClient) {
        console.log('Estoy con persistencia')
        this.loadLocalStorage();
     }

    searchByCapital( q: string, url: string): Observable<Country[]>{
        return this.http.get<Country[]>(`${ this.apiUrl }/${ url }/${ q }`)
        .pipe(
            tap((countries:Country[]) => this.cacheStore.byCapital = {term: q , countries: countries}),
            tap(() => this.saveLocalStorage()),
            catchError( () => of([]))
        );
    }
    searchByCountry( q: string, url: string): Observable<Country[]>{
        return this.http.get<Country[]>(`${ this.apiUrl }/${ url }/${ q }`)
        .pipe(
            tap((countries:Country[]) => this.cacheStore.byCountries = {term: q , countries: countries}),
            tap(() => this.saveLocalStorage()),
            catchError( () => of([]))
        );
    }
    searchByRegion( region: region, url: string): Observable<Country[]>{
        return this.http.get<Country[]>(`${ this.apiUrl }/${ url }/${ region }`)
        .pipe(
            tap((countries:Country[]) => this.cacheStore.byRegion = {region: region , countries: countries}),
            tap(() => this.saveLocalStorage()),
            catchError( () => of([]))
        );
    }
    //  // capital
    // searchCountry(q: string): Observable<Country[]>{ 
    //     return this.http.get<Country[]>(`${this.apiUrl}/name/${ q }`).pipe(
    //         catchError( () => of([]))
    //     )
    // }
    // searchRegion(q: string): Observable<Country[]>{
    //     return this.http.get<Country[]>(`${ this.apiUrl}/subregion/${ q }`).pipe(
    //         catchError( () => of([]))
    //     )
    // }
    
}