import { Injectable, NgZone } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorisedSideNavService {
  hideSideNav: boolean = false;

  constructor(private commonservice: CommonService, public ngzone: NgZone) { }

  toggleSideNav(): void {
    // console.log("toggle", this.commonservice.showTour)
    this.ngzone.run(() => {
      console.log("side nav");
      this.hideSideNav = !this.hideSideNav;

      if (!this.hideSideNav) {
        this.commonservice.showTour = { 'margin-left': '0px'}
      }
    })
  }

  tiggleSide(): void {
    this.ngzone.run(() => {
      console.log("side nav");
      this.hideSideNav = !this.hideSideNav;

      if(this.hideSideNav){
        this.commonservice.showTour = { 'margin-left': '-175px' }
      }
    })
  }
}
