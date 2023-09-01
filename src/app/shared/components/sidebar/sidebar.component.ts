import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public rutas = [

    {
      home: 'countries/by-capital',
      label: 'Por Capital'
    },
    {
      home: 'countries/by-country',
      label: 'Por Pais'
    },
    {
      home: 'countries/by-region',
      label: 'Por Region'
    }
    
    
  ]


}
