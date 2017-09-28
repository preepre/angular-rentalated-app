import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Apartment } from '../apartment';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { User } from "../User";


@Injectable()
export class ApartmentDataService {

  //create private variable of type Http called http
  constructor( private http: Http ) {
    this.aptChanged = new Subject<Apartment>();
   }

   aptChanged: Subject<Apartment>;

  getActiveListings(): Observable<Apartment[]> {
    return this.http 
      .get('http://localhost:4567/api/apartments', { withCredentials : true})
      .map(response => response.json());
  }

  getMyListings(): Observable<Apartment[]> {
    return this.http 
      .get('http://localhost:4567/api/apartments/mine', { withCredentials : true})
      .map(response => response.json());
  }

  deactivate (apartment : Apartment) : Observable<Apartment> {

    return this.http 
      .post('http://localhost:4567/api/apartments/' + apartment.id  + '/deactivate', { withCredentials : true})
      .map(response => response.json());
  }

  activate (apartment : Apartment) : Observable<Apartment> {

    return this.http 
      .post('http://localhost:4567/api/apartments/' + apartment.id  + '/activate', { withCredentials : true})
      .map(response => response.json());
  }

  createApt(rent : number, 
    number_of_bedrooms : number,
    number_of_bathrooms : number,
    square_footage : number,
    address : string,
    city : string,
    state : string,
    zip_code : number  ) : Observable<Apartment> {

      const apt = { rent, number_of_bedrooms, number_of_bathrooms, square_footage, address, city, state, zip_code};

      return this.http 
      .post('http://localhost:4567/api/apartments', apt, { withCredentials : true})
      .map(response => response.status === 201 ? response.json() : null)
      .do(Apartment => this.aptChanged.next(Apartment))
      ;

  }

  createLike(apartment : Apartment) {

    const like = { apartment};

    return this.http 
      .post('http://localhost:4567/api/apartments/' + apartment.id + '/like',  like, { withCredentials : true})
      .map(response => response.status === 201 ? response.json() : null)
      //.do(Apartment => this.aptChanged.next(Apartment))
      ;

  }
  



}
