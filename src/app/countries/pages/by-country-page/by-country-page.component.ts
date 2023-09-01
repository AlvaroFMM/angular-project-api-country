import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interface/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {
  // valor que se manda desde el padre al hijo
  public country: Country [] = [];
  public url: string = 'name';
  public initialValue: string = '';
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.country = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(valorInput: string) {
    return this.countriesService.searchByCountry(valorInput, this.url)
    .subscribe(country => this.country = country)
  }
}
