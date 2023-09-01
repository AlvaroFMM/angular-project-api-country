import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interface/country';
import { region } from '../../interface/region.types';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit{

  public region: Country[] = [];
  public valoreRegiones: Country[] = [];
  public regiones: region[] = ['Africa','America','Asia','Europe','Oceania']
  public selectedBoton: string | null = null;


  public url: string = 'subregion'
  constructor(private countriesService :CountriesService){}
  ngOnInit(): void {
    this.region = this.countriesService.cacheStore.byRegion.countries;
    this.selectedBoton = this.countriesService.cacheStore.byRegion.region;
  } 
  searchByRegion(region: region){
      this.selectedBoton = region;
      
      return ( this.countriesService.searchByRegion( region, this.url))
      .subscribe(regiones => this.region = regiones )
  }
}
