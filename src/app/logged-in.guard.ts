import { Injectable } from '@angular/core';

// GET THE ROUTER SO THE GUARD CAN NAVIGATE AWAY
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// GET HTTP BECAUSE AJAX
import { Http } from '@angular/http';

// ADD SOME OBSERVABLE OPERATORS FOR THE HANDLING OF ERRORS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class LoggedInGuard implements CanActivate {

  // GET THE ROUTER AND HTTP OBJECTS FROM ANGULAR
  constructor(private router: Router, private http: Http) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // DECLARE SOME HANDY CONSTANTS
    const checkUrl = 'http://localhost:5000/api/apartments';
    const options = {
      withCredentials: true
    };

    // MAKE AN HTTP GET CALL AND, IF IT SUCCEEDS, RETURN TRUE
    // OTHERWISE, NAVIGATE AWAY AND RETURN FALSE
    return this.http
      .get(checkUrl, options)
      .map(() => true)
      .catch((error, caught) => {
        this.router.navigate(['/login']);
        return Observable.of(false);
      });
  }

}
