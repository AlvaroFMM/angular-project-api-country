import { Country } from './../../interface/country';
import { Component, OnInit, Input } from '@angular/core';
import { CountriesService } from '../../services/countries.service';


@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit{
  
  public isLoading: boolean = false;
  public country: Country [] = [];
  public url: string = 'capital';

  public initialValue = '';
  

constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.country = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }
  searchByCapital(q: string){
    this.isLoading = true;
    this.countriesService.searchByCapital( q, this.url )
    .subscribe(country=> {
      this.isLoading = false;
      this.country = country;
    })
  }

}
