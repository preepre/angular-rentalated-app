import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ApartmentListingsComponent } from './apartment-listings/apartment-listings.component';
import { ApartmentDataService } from './apartment-data/apartment-data.service';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { LoginComponent } from './login/login.component';
import { SessionDataService } from "./session-data/session-data.service";
import { MyApartmentListingsComponent } from './my-apartment-listings/my-apartment-listings.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { LoggedInGuard } from "./logged-in.guard";

const routes: Route[] = [
  { path: 'login',               component: LoginComponent },
  { path: '',                    component: ApartmentListingsComponent },
  { path: 'apartments/mine',     component: MyApartmentListingsComponent},
  { path: 'apartments/create',   component: CreateListingComponent},

    // GUARD THE MAIN SCREEN WITH THE CANACTIVATE CALL
  { path: 'apartments/mine',     component: MyApartmentListingsComponent, canActivate:    [LoggedInGuard] },

  { path: 'apartments/create',     component: CreateListingComponent, canActivate:    [LoggedInGuard] },

  { path: '',  redirectTo: '/login', pathMatch: 'full' }

]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ApartmentListingsComponent,
    ApartmentDetailComponent,
    LoginComponent,
    MyApartmentListingsComponent,
    CreateListingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ApartmentDataService, SessionDataService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
