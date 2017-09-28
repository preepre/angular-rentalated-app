import { Component, OnInit, Input } from '@angular/core';
import { Apartment } from "../apartment";
import { ApartmentDataService } from "../apartment-data/apartment-data.service";

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  @Input()
  apartment: Apartment;
  selectedApartment: Apartment;
  error: string;

  constructor(private data: ApartmentDataService) { }

  selectApartment(apartment: Apartment){
    this.selectedApartment = apartment;
  }

  activate(apartment : Apartment ) {
    apartment.is_active = true;
        
    this.data
    .activate(apartment).subscribe(
      apartment => apartment = apartment,
      () => this.error = 'could not find apt to deactivate',

    )


  }

  deactivate(apartment : Apartment) {
  
    apartment.is_active = false;
        
    this.data
    .deactivate(apartment).subscribe(
      apartment => apartment = apartment,
      () => this.error = 'could not find apt to deactivate',

    )
  }

  ngOnInit() {
    
  }

}