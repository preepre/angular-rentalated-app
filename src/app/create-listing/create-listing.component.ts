import { Component, OnInit } from '@angular/core';
import { Apartment } from "../apartment";
import { ApartmentDataService } from "../apartment-data/apartment-data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  apartment: Apartment;
  error: string;
  rent : number;
  number_of_bedrooms : number;
  number_of_bathrooms : number;
  square_footage : number;
  address : string;
  city : string;
  state : string;
  zip_code : number;
  message: string;

  constructor(private data: ApartmentDataService, private router: Router ) { }

  createListing(apartment: Apartment){
    this.data
    .createApt(this.rent, this.number_of_bedrooms, this.number_of_bathrooms, this.square_footage, this.address, this.city, this.state, this.zip_code)
    .subscribe(
        apartment => {
        if(apartment){
            this.router.navigate(['/apartments/mine']);
        }
        else {
          this.message = 'could not create apartment listing';
        }
        
        },
        e => this.message = 'RUH ROH, Reter! ' + e
      );


      
      
    
    
  }

  ngOnInit() {
  }

}
