import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder:String = '';
  
  @Input()
  public initialValue: string = '';
 
  //Mandamos por ouput el valor del input
  //@ViewChild('txtInput', { static: false }) public inputElement!: ElementRef<HTMLInputElement>;
  @Output() onValue = new EventEmitter<string>();

  // emviarMensaje(valorInput: string){
  //   this.onValue.emit(valorInput);
  // }
  ngOnInit(): void {
    this.debouncerSuscription =  this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( valor =>{
       this.onValue.emit(valor)
      
    })
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
  oneKeyPress(searchTerm: string):void{
    this.debouncer.next(searchTerm);
    
  }


}
