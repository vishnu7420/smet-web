import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.scss']
})
export class CollegeDetailsComponent implements OnInit {
  display: any = "none";
  colleges: any;
  scope: any;
  collegeId: any;
  scopeId: any;
  fees: any;
  collegeDetails: any;
  id: any;

  collegeDetailsForm: FormGroup

  error_messages = {
    'collegeName': [
      { type: 'required', message: 'Please select college name' },
    ],
    'scopeName': [
      { type: 'required', message: 'Please select scope' },
    ],
    'feesVal': [
      { type: 'required', message: 'Please enter fees' },
    ]
  }
  adminName: any;
  adminImage: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder,
  ) { 
    this.collegeDetailsForm = this.formBuilder.group({
      collegeName: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      scopeName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      
      feesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
  }

  ngOnInit(): void {
    // Get All College \\
    const servicePathCollege = this.utils.getApiConfigs('college');
    this.commonservice.invokeService(servicePathCollege[1].method, servicePathCollege[1].path, '')
      .then((resp: any) => {
        console.log("College", resp);
        if (resp.status_code == "200") {
          this.colleges = resp.data;
        }
      });

    // Get All Scope \\
    const servicePathScope = this.utils.getApiConfigs('scope');
    this.commonservice.invokeService(servicePathScope[1].method, servicePathScope[1].path, '')
      .then((resp: any) => {
        console.log("Scope", resp);
        if (resp.status_code == "200") {
          this.scope = resp.data;
        }
      });

    const servicePath = this.utils.getApiConfigs('collegedetails');
    this.commonservice.invokeService(servicePath[1].method, servicePath[1].path, '')
      .then((resp: any) => {
        console.log("colledetails", resp);
        if (resp.status_code == "200") {
          this.collegeDetails = resp.data;
        }
      });
  }

  addCollegeDetails() {
    let payload = {
      "college_id": this.collegeId,
      "scope_id": this.scopeId,
      "fees": this.fees
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('collegedetails');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("College Details added Successfully");
          this.display = "none";
          this.collegeDetailsForm.reset();
          this.ngOnInit();
        } else if (resp.status_code == "400") {
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
        }
      });
  }

  openAdd() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

}
