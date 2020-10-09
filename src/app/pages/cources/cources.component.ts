import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cources',
  templateUrl: './cources.component.html',
  styleUrls: ['./cources.component.scss']
})
export class CourcesComponent implements OnInit {

  display: any = "none";
  displayDelete: any = "none";
  courseName:any;
  cources: any [];
  courseData: any;
  showAdd = false;
  showEdit = false;
  id: any;

  courseForm: FormGroup;

  showErr = false;
  deleteErr: any;

  error_messages = {
    'courseval': [
      { type: 'required', message: 'Please enter course' },
    ],
  }
  adminName: any;
  adminImage: any;
  allCourse: any;
  allData: any;

  constructor(
    public utils:ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder,
  ) {
    this.courseForm = this.formBuilder.group({
      courseval: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
   }

  ngOnInit(): void {
    // Get All Courses \\
    const servicePathDistrict = this.utils.getApiConfigs('course');
    this.commonservice.invokeService(servicePathDistrict[1].method, servicePathDistrict[1].path, '')
      .then((resp: any) => {
        console.log("Course", resp);
        if (resp.status_code == "200") {
          this.courseData = resp.data;
        }
        this.allCourse = this.courseData;
      });
  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.courseData;

    console.log("All Data", this.allData);

    if (val) {
      this.allCourse = this.allData.filter(item =>
        (item.courses).toLowerCase().includes((val).toLowerCase()) 
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

  addCourse(){
    let payload = {
      "courses": this.courseName,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('course');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course added Successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          this.display = "none";
          console.log("data", resp.data);
        }
      });
  }

  openAdd() {
    this.courseForm.reset();
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  editCourse(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.courseName = data.courses;
    this.id = data.id;
  }

  deleteCourse(data){
    this.displayDelete = "block";
    this.id = data.id;
  }

  updateCourse(){
    let payload = {
      "courses": this.courseName,
      "id": this.id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('course');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course updated successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
        }
      });
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
  }

  delete(){
    let payload = {
      "id": this.id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('deletecourses');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course deleted successfully");
          this.displayDelete = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.showErr = true;
          this.deleteErr = resp.message;
        }
      });
  }

}
