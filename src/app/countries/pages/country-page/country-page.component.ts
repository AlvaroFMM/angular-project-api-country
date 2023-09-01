import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { map, switchMap } from 'rxjs';
import { Country } from '../../interface/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  public url: string = 'alpha';
  public country?: Country;
  constructor(
    private activateRoute: ActivatedRoute,
    private serviceCoutries: CountriesService,
    private router: Router
    ){}
  //se hace en el onnit es para capturar el valor del url antes de que la pagina se halla cargado
  //porque nececitamos captura el valor de la url para recien cargar los elementos que vienen en la pagina
  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      //en params nosotros nos suscribimos y obtenemos el id de la url 
      //permite transformar un valor emitido por un observable en otro observable, 
      //y al mismo tiempo cancelar y desuscribirse automáticamente del observable anterior.
      switchMap((params)=> this.serviceCoutries.searchByCapital(params['id'],this.url)),
      map(countrie => countrie.length>0 ? countrie[0]: null)
    )
    .subscribe( result =>{
      return !result ? this.router.navigateByUrl(''): this.country = result;
      
    })
  }
}
