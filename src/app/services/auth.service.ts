import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {this.checkToken(); }
  userActive = new BehaviorSubject(false);
  vendorActive = new BehaviorSubject(false);

  isAuthenticated() {
    return this.userActive.value;
  }
  isVendorAuthenticated() {
    return this.vendorActive.value;
  }

  checkToken() {
    let userDetails = localStorage.getItem("login-type");
    if (userDetails == '"admin"') {
      this.userActive.next(true)
      this.vendorActive.next(false)
    } else {
      this.vendorActive.next(true)
      this.userActive.next(false)
    }
  }
}
