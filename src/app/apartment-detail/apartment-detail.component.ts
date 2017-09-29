import { Component, OnInit, Input } from '@angular/core';
import { Apartment } from "../apartment";
import { ApartmentDataService } from "../apartment-data/apartment-data.service";
import { User } from "../User";
import { SessionDataService } from "../session-data/session-data.service";

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
  currentSessionUser: number;
  apartmentOwnerUser: number;
  isOwner: boolean;
  users: User[];

  constructor(private data: ApartmentDataService, private session: SessionDataService) { }

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

  like() {             
    this.data
    .createLike(this.apartment).subscribe(
      apartment => apartment = apartment,
      () => this.error = 'could not like apt',

    )
  }

  ngOnInit() {
    
    this.currentSessionUser = this.session.currentUser.id;
    this.apartmentOwnerUser = this.apartment.user_id;

        if(this.currentSessionUser == this.apartmentOwnerUser){
              this.isOwner = true;

          }
        else {
             this.isOwner = false;
          }
    
    // this.data
    //   .getUsersWhoLiked(this.apartment)
    //   .subscribe(
    //     users => this.users = users,
    //     () => this.error = 'Could not load apartment data',
    //   );

  }

}
