import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent implements OnInit {

  display: any = "none";
  displayDelete: any = "none";
  course:any;
  courseDetails: any;
  courseDuration: any;
  scopeCourse: any;
  salary: any;
  topCampus: any;
  scopeDetails: any;
  eligibility:any;

  showAdd = false;
  showEdit = false;
  id: any;

  scopeForm: FormGroup;

  miniSalary: any;
  maxSalary: any;
  fees:any;
  showErr = false;
  deleteErr: any;

  error_messages = {
    'courseval': [
      { type: 'required', message: 'Please enter course' },
    ],
    'scopeVal': [
      { type: 'required', message: 'Please enter scope of the course' },
    ],
    'durationVal': [
      { type: 'required', message: 'Please enter course duration' },
    ],
    'eligibilityVal': [  
      { type: 'required', message: 'Please enter eligibility' },
    ],
    'miniFeesVal': [
      { type: 'required', message: 'Please enter fees' },
    ],
    // 'maxFeesVal': [
    //   { type: 'required', message: 'Please enter maximum fees' },
    // ],
    'miniSalaryVal': [
      { type: 'required', message: 'Please enter minimum salary' },
    ],
    'maxSalaryVal': [
      { type: 'required', message: 'Please enter maximum salary' },
    ],
    'topCampusVal': [
      { type: 'required', message: 'Please enter top campuses' },
    ]
  }
  adminName: any;
  adminImage: any;
  allScope: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder
  ) {

    this.scopeForm = this.formBuilder.group({
      courseval: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      // degreeTypeVal: new FormControl('', Validators.compose([
      //   Validators.required,
      // ])),
      // courseTypeVal: new FormControl('', Validators.compose([
      //   Validators.required,
      // ])),
      scopeVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      durationVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      eligibilityVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      miniFeesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      // maxFeesVal: new FormControl('', Validators.compose([
      //   Validators.required,
      // ])),
      miniSalaryVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      maxSalaryVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      topCampusVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
   }

  ngOnInit(): void {

    // GET ALL COURSE DETAILS \\
    const servicePath = this.utils.getApiConfigs('coursedetails');
    this.commonservice.invokeService(servicePath[1].method, servicePath[1].path, '')
      .then((resp: any) => {
        console.log("CourseDetails", resp);
        if (resp.status_code == "200") {
          this.courseDetails = resp.data;
        }
      });

    // GET ALL THE SCOPE \\
    const servicePathScope = this.utils.getApiConfigs('scope');
    this.commonservice.invokeService(servicePathScope[1].method, servicePathScope[1].path, '')
      .then((resp: any) => {
        console.log("Scope details", resp);
        if (resp.status_code == "200") {
          this.scopeDetails = resp.data;
        }
        this.allScope = this.scopeDetails;
      });

  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.scopeDetails;

    console.log("All Data", this.allData);

    if (val) {
      this.allScope = this.allData.filter(item =>
        (item.courses).toLowerCase().includes((val).toLowerCase()) || (item.course_type).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allScope);
    if(this.allScope == ""){
      this.globalService.showError("No data found");
    }
  }

  reset(){
    this.ngOnInit();
  }

  openAdd() {
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
  }

  deleteScope(data){
    this.displayDelete = "block";
    this.id = data.id;
  }

  editScope(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.id = data.id;
    this.course = data.course_details_id;
    this.scopeCourse = data.scope;
    this.courseDuration = data.durations;
    this.salary = data.salary;
    this.topCampus = data.top_campus;
    this.eligibility = data.eligibility;
  }

  addScope(){
    let payload = {
      "course_details_id": this.course,
      "scope": this.scopeCourse,
      "duration": this.courseDuration,
      "salary": this.salary,
      "top_campus": this.topCampus,
      "eligibility": this.eligibility,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('scope');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Scope of the Course added Successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
        }
      });
  }

  updateScope(){

    this.salary = this.miniSalary.concat(' - ', this.maxSalary.toString());

    console.log("salary", this.salary);

    let payload = {
      "id": this.id,
      "course_details_id":this.course,
      "scope": this.scopeCourse,
      "durations": this.courseDuration,
      "salary": this.salary,
      "fees": this.fees,
      "top_campus": this.topCampus,
      "eligibility": this.eligibility,
  
      // "course_details_id": this.course,
      // "scope": this.scopeCourse,
      // "durations": this.courseDuration,
      // "salary": this.salary,
      // "top_campus": this.topCampus,
      // "eligibility": this.eligibility,
      // "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('editscope');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Scope of the Course updated Successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.message);
          this.globalService.showError(resp.message);
          this.display = "none";
        }
      });
  }

  delete(){
    let payload = {
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('deletescope');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Scope of the Course deleted Successfully");
          this.display = "none";
          this.ngOnInit();
          this.scopeForm.reset();
        }else if(resp.status_code == "400"){
          console.log("data", resp.message);
          this.showErr = true;
          this.deleteErr = resp.message;
          this.scopeForm.reset();
        }
      });
  }

}
