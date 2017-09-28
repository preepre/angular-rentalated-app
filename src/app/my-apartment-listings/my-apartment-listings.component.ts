import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from "../apartment-data/apartment-data.service";
import { Apartment } from "../apartment";

@Component({
  selector: 'app-my-apartment-listings',
  templateUrl: './my-apartment-listings.component.html',
  styleUrls: ['./my-apartment-listings.component.css']
})
export class MyApartmentListingsComponent implements OnInit {

  apartments: Apartment[];
  error: string;
  selectedApartment: Apartment;


  constructor(private data: ApartmentDataService) { }

   selectApartment(apartment: Apartment){
    this.selectedApartment = apartment;
  }

    hideStuff() {
    this.selectedApartment = null;
  }


  ngOnInit() {
    this.data
      .getMyListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Could not load apartment data',
      );
  }



}
