import { Component, OnInit, NgZone, Renderer2, ElementRef } from '@angular/core';
import { AuthorisedSideNavService } from '../services/authorised-side-nav.service';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { ApilistService } from 'src/app/services/apilist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

import { trigger, state, style, transition, animate, group } from '@angular/animations'

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-authorised-side-nav',
  templateUrl: './authorised-side-nav.component.html',
  styleUrls: ['./authorised-side-nav.component.scss'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }],
  animations: [
    trigger('toggleBox', [
      // ...
      state('open', style({
        height: 'auto',
        backgroundColor: 'transparent',
      })),
      state('closed', style({
        height: '0px',
        backgroundColor: 'transparent',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class AuthorisedSideNavComponent implements OnInit {
  public isCollapsed: boolean = false;
  public display = "none";
  showError: boolean = false;
  ErrorMsg: string;
  isContentOpen: boolean = false;
  toggle = {};
  getId: any;
  sideMenu_list: any;
  exit: boolean;

  isOpen = false;
  isCollegeOpen = false;

  
  constructor(public sideNavService: AuthorisedSideNavService,
      public commonservice: CommonService, 
      public utils: ApilistService,
      public router: Router, 
      private modalService: NgbModal, 
      private authservice: AuthService,
      public ngzone: NgZone,
      private renderer: Renderer2,
      private elementRef: ElementRef,) {
  }

  ngOnInit() {
    if (localStorage.getItem('login-type') == '"vendor"') {
      let servicePath = this.utils.getApiConfigs("get_subscription");
      this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
        .then((respVal: any) => {
          console.log(respVal);
          if (respVal.payload.status == 200) {
            if (respVal.status.status != 'active' && respVal.status.status != 'created') {
              this.display = "block";
              this.exit = false;
            }
          }

        });
    }
  } logout() { this.display = "block"; this.exit = true; }

  toggleNav(): void {
    console.log("nav");
    let myTag ; 
    myTag = this.elementRef.nativeElement.querySelector(".page-wrapper");
   
    this.renderer.addClass(myTag, 'toggled');

    this.commonservice.showTour = { 'margin-left': '0px', 'transition': 'all .60s ease', }
  }

  closeNav(): void{
    console.log("close");
    let myTag ; 
    myTag = this.elementRef.nativeElement.querySelector(".page-wrapper");
    this.renderer.removeClass(myTag, 'toggled');

    this.commonservice.showTour = { 'margin-left': '-200px', 'transition': 'all .50s ease', }
  }

  courseDetails(){
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }

  dashboard(){
    this.router.navigate(['/dashboard']);
  }

  college(){
    this.isCollegeOpen = !this.isCollegeOpen;
    this.router.navigate(['/colleges']);
  }

  collegeDetails(){
    this.router.navigate(['/collegeDetails']);
  }

  scope(){
    this.router.navigate(['/scope']);
  }

  addcourseDetails(){
    this.router.navigate(['/addCourseDetails']);
  }

  courses(){
    this.router.navigate(['/cources'])
  }

  courseType(){
    this.router.navigate(['/courseType']);
  }

  degree(){
    this.router.navigate(['/addDegree'])
  }

  degreeType(){
    this.router.navigate(['/degreeType']);
  }

  studentsView(){
    this.router.navigate(['/users']);
  }

  adImages(){
    this.router.navigate(['/adImages']);
  }

  userRole(){
    this.router.navigate(['/userRoles']);
  }

  adminUpdate(){
    this.router.navigate(['/profile']);
  }

  signout(){
    this.display = "block";
  }

  addVideos(){
   this.router.navigate(['/adVideo']); 
  }

  addClgImages(){
    this.router.navigate(['/addClgImgs']);
  }

  addCountry(){
    this.router.navigate(['/addCountry']);
  }

  addcoursecollege(){
    this.router.navigate(['/addcourseCollege']);
  }

  /**
   * Close modal when click close button
   */
  onCloseHandled() {
    this.display = "none";
  }
  /**
   * click ok to logout from the app
   */
  ok() {

    console.log("Logout");
    this.router.navigate(['/sign-in']);

    // this.showError = false;
    // let servicePath = this.utils.getApiConfigs("logout");
    // this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
    //   .then((respVal: any) => {
    //     if (respVal.payload.status == 200) {
    //       localStorage.clear();
    //       this.authservice.userActive.next(false);
    //       this.router.navigate(['/signin']);
    //     } else {
    //       this.showError = true;
    //       this.ErrorMsg = "Failed to logout";
    //       // const modalRef = this.modalService.open(ModalPopupComponent);
    //       // modalRef.componentInstance.flag = 'expire';
    //       this.router.navigate(['/signin']);
    //     }
    //   });
  }
  // goPage(num, page, flag) {
  //   console.log("num","Page", "Flag", num, page, flag);
  //   if (page != undefined) {
  //     if (page != 'logout') {
  //       let url = '/' + page + '';
  //       this.router.navigate([url])
  //     } else {
  //       this.logout();
  //     }
  //   }
  //   this.hideMenu();
  // }
  hideMenu() {
    if (this.commonservice.screenWidth <= 910) {
      this.commonservice.showTour = { 'margin-left': '-250px' }
    } else {
      this.commonservice.showTour = { 'margin-left': '0px' }
    }
  }

  notallow() {
    // this.router.navigate(['/signin']);
    this.display = "none";
    // localStorage.clear();
  }
}
