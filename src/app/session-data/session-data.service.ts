import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { User } from '../User'
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/do";

@Injectable()
export class SessionDataService {

  baseUrl = 'http://localhost:4567/api/sessions';
  options = { withCredentials: true };

  userChanged: Subject<User>;
  currentUser : User;

  constructor(private http: Http) {
    this.userChanged = new Subject<User>();
   }

  login(email: string, password: string): Observable<User>{
    const payLoad = { email, password };
    return this.http
      .post(this.baseUrl, payLoad, this.options)
      .map(response => response.status === 201 ? response.json() : null)
      .do(User => this.userChanged.next(User))
      .do(currentUser => this.currentUser = currentUser);
  }

  logout(): Observable<User> {
    return this.http
    .delete(`${this.baseUrl}/mine`)
     .map(response => null) //TODO, come back and finish the failure!
     .do(user => this.userChanged.next(user))
     .do(currentUser => this.currentUser = currentUser);
  }
}
