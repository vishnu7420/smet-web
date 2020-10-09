import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course-details',
  templateUrl: './add-course-details.component.html',
  styleUrls: ['./add-course-details.component.scss']
})
export class AddCourseDetailsComponent implements OnInit {
  display: any = "none";
  displayDelete: any = "none";
  degree: any;
  course: any;
  courseType: any;
  degreeDetails: any;
  courseDetails: any;
  courseTypeDetails: any;
  courseData: any;

  showAdd = false;
  showEdit = false;
  id: any;

  courseDetailsForm: FormGroup;

  courseName: any;
  scope: any;
  degreeType: any;
  duration: any;
  eligibility: any;
  miniFees: any;
  maxFees: any;
  miniSalary: string;
  maxSalary: string;
  topCampus: any;

  showErr = false;
  deleteErr: any;
  fees: any;

  error_messages = {
    'courseval': [
      { type: 'required', message: 'Please enter course' },
    ],
    'degreeTypeVal': [
      { type: 'required', message: 'Please select degree type' },
    ],
    'courseTypeVal': [
      { type: 'required', message: 'Please select course type' },
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
  allCourseDetails: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder,
  ) {
    this.courseDetailsForm = this.formBuilder.group({
      courseval: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      degreeTypeVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      courseTypeVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
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
    // Get All Degree \\
    const servicePathDegree = this.utils.getApiConfigs('degree');
    this.commonservice.invokeService(servicePathDegree[1].method, servicePathDegree[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.degreeDetails = resp.data;
          // console.log("Degree type", resp);
        }
      });

    // Get All Course \\
    const servicePathCourse = this.utils.getApiConfigs('course');
    this.commonservice.invokeService(servicePathCourse[1].method, servicePathCourse[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.courseData = resp.data;
          // console.log("Course", resp);
        }
      });

    // Get All Course Type \\
    const servicePathCourseType = this.utils.getApiConfigs('coursetype');
    this.commonservice.invokeService(servicePathCourseType[1].method, servicePathCourseType[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.courseTypeDetails = resp.data;
          // console.log("Course type", resp);
        }
      });

    // Get All Course Details Type \\
    const servicePathCourseDetails = this.utils.getApiConfigs('coursedetails');
    this.commonservice.invokeService(servicePathCourseDetails[1].method, servicePathCourseDetails[1].path, '')
      .then((resp: any) => {
        console.log("coursedetails", resp);
        if (resp.status_code == "200") {
          this.courseDetails = resp.data;
        }
        this.allCourseDetails = this.courseDetails;
      });
  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.courseDetails;

    console.log("All Data", this.allData);

    if (val) {
      this.allCourseDetails = this.allData.filter(item =>
        (item.courses).toLowerCase().includes((val).toLowerCase()) || (item.type).toLowerCase().includes((val).toLowerCase()) || (item.degree).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allCourseDetails);
    if(this.allCourseDetails == ""){
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

  editCourseDetail(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.id = data.id;
    this.degreeType = data.degree_id;
    this.courseName = data.course_id;
    this.courseType = data.coursetype_id;
  }

  deleteCourse(data){
    this.displayDelete = "block";
    this.id = data.id;
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
  }

  addCourseDetails() {

    console.log("salaey", typeof(this.miniSalary), typeof(this.maxSalary));

    let salary = this.miniSalary.concat(' - ', this.maxSalary.toString());

    console.log("salary", salary);

    let payload = {
      "degree_id": this.degreeType,
      "course_id": this.courseName,
      "course_type": this.courseType,
      "scope": this.scope,
      "durations": this.duration,
      "fees": this.fees,
      "salary": this.miniSalary,
      "top_campus": this.topCampus,
      "eligibility": this.eligibility,

      // "degree_id": this.degree,
      // "course_id": this.course,
      // "course_type_id": this.courseType,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('coursedetails');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course Details Added Successfully");
          this.ngOnInit();
        } else if (resp.status_code == "400") {
          console.log("data", resp.data);
        }
      });
  }

  updateCourseDetails(){
    let payload = {
      "id": this.id,
      "degree_id": this.degreeType,
      "course_id": this.courseName,
      "course_type": this.courseType  
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('editcoursedetails');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course Details Updated Successfully");
          this.display = "none";
          this.ngOnInit();
        } else if (resp.status_code == "400") {
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
          this.ngOnInit();
        }
      });
  }

  delete(){
    let payload = {
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('deletecoursedetails');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course deleted successfully");
          this.displayDelete = "none";
          this.ngOnInit();
        } else if (resp.status_code == "400") {
          console.log("data", resp.data);
          this.showErr = true;
          this.deleteErr = resp.message;
        }
      });
  }
}
