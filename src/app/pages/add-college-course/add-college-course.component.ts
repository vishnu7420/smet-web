import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ApilistService } from 'src/app/services/apilist.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-college-course',
  templateUrl: './add-college-course.component.html',
  styleUrls: ['./add-college-course.component.scss']
})
export class AddCollegeCourseComponent implements OnInit {

  collegeId: any;
  display: any = "none";
  courseaddForm: FormGroup;

  scopeIdArray = [];

  error_messages = {
    'collegeName': [
      { type: 'required', message: 'please select college name.' },
    ],
    'checkVal': [
      { type: 'required', message: 'Please select course' },
    ],
    'feesVal': [
      { type: 'required', message: 'Please enter fees' },
    ],
    'trustFeesVal': [
      { type: 'required', message: 'Please enter trust fees' },
    ],
  }
  colleges: any;
  scopeData: any;
  courseDetails;
  adminName: any;
  adminImage: any;
  allCourse: any;
  allData: any;

  constructor(
    public formBuilder: FormBuilder,
    public commonservice: CommonService,
    public utils: ApilistService,
    public globalService: GlobalService,
  ) {
    this.courseaddForm = this.formBuilder.group({
      collegeName: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      checkVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      feesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      trustFeesVal: new FormControl('', Validators.compose([
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
    // console.log("servicePathCollege",servicePathCollege);
    this.commonservice.invokeService(servicePathCollege[1].method, servicePathCollege[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.colleges = resp.data;
        }
      });

    // Get Scope \\
    const servicePathscope = this.utils.getApiConfigs('scope');
    this.commonservice.invokeService(servicePathscope[1].method, servicePathscope[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.scopeData = resp.data;
          // console.log("Scope", this.scopeData);
        }
      });


    // GET COURSES FOR COLLEGE \\
    const servicePath = this.utils.getApiConfigs('individualcollegecourse');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.courseDetails = resp.data;
          console.log("course details", this.courseDetails);
        }

        this.allCourse = this.courseDetails;
      });

  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.courseDetails;

    console.log("All Data", this.allData);

    if (val) {
      this.allCourse = this.allData.filter(item =>
        (item.college_name).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allCourse);
    if(this.allCourse == ""){
      this.globalService.showError("No data found");
    }
  }

  reset(){
    this.ngOnInit();
  }

  openAdd() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  onCheckChange(event) {
    console.log(this.scopeData);
    console.log("event", event);
    // if(event.target.checked == true){
    //   this.scopeIdArray.push(event.target.ngValue);
    // }

    console.log("Scope Array", this.scopeIdArray);
    // console.log("scope Amount");
  }

  addCourses() {

    for (var i = 0; i < this.scopeData.length; i++) {
      if ((this.scopeData[i].fees != null) && (this.scopeData[i].trustFees)) {
        this.scopeIdArray.push({ college_id: this.collegeId, scope_id: this.scopeData[i].id, fees: this.scopeData[i].fees, trust_fees: this.scopeData[i].trustFees });
      }
    }

    console.log("scope payload", this.scopeIdArray);

    let payload = {
      "scopes": this.scopeIdArray,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('collegedetails');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course Details added Successfully");
          this.display = "none";
          // this.collegeDetailsForm.reset();
          this.ngOnInit();
        } else if (resp.status_code == "400") {
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
        }
      });
  }

}
