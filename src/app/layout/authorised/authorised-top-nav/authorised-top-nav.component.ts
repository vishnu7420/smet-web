import { Component, OnInit, NgZone, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorised-top-nav',
  templateUrl: './authorised-top-nav.component.html',
  styleUrls: ['./authorised-top-nav.component.scss']
})
export class AuthorisedTopNavComponent implements OnInit {
  topImage: any;
  isDataAvailable: boolean = false;
  admin_name: any;
  userType: string;

  constructor(public commonservice: CommonService, private ngzone: NgZone, public router: Router) {
  }

  ngOnInit() {

  }
}