import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course-type',
  templateUrl: './add-course-type.component.html',
  styleUrls: ['./add-course-type.component.scss']
})
export class AddCourseTypeComponent implements OnInit {
  display: any = "none";
  displayDelete: any = "none";
  courseType: any;

  fileToUpload: any;
  imageUrl: any;
  courseTypeData: any;

  showAdd: any;
  showEdit: any;
  id: any;

  courseTypeForm: FormGroup;

  degreeType: any;

  showErr = false;

  error_messages = {
    'courseTypeVal': [
      { type: 'required', message: 'Please enter course type' },
    ],
    // 'degreetypeVal' :[
    //   { type: 'required', message: 'Please select degree type' },
    // ],
    'courseTypeImage':[
      { type: 'required', message: 'Please enter course image' },
    ]
  }
  deleteErr: any;
  adminName: any;
  adminImage: any;
  allCourseType: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder,
  ) {
    this.imageUrl = 'assets/tenant-avatar.jpg';

    this.courseTypeForm = this.formBuilder.group({
      courseTypeVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      courseTypeImage: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      // degreetypeVal: new FormControl('', Validators.compose([
      //   Validators.required,
      // ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
   }

  ngOnInit(): void {
    const servicePath = this.utils.getApiConfigs('coursetype');
    this.commonservice.invokeService(servicePath[1].method, servicePath[1].path, '')
      .then((resp: any) => {
        console.log("Course type", resp);
        if (resp.status_code == "200") {
          this.courseTypeData = resp.data;
        }
        this.allCourseType = this.courseTypeData;
      });
  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.courseTypeData;

    console.log("All Data", this.allData);

    if (val) {
      this.allCourseType = this.allData.filter(item =>
        (item.type).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allCourseType);
    if(this.allCourseType == ""){
      this.globalService.showError("No data found");
    }
  }

  reset(){
    this.ngOnInit();
  }

  openAdd() {
    this.courseTypeForm.reset();
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  editCourseType(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;    

    this.imageUrl = data.image;
    this.courseType = data.type;
    this.id = data.id;
  }

  deleteCourseType(data){
    this.displayDelete = 'block';
    this.id = data.id;
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      // console.log("img", this.imageUrl);
    }
   
    reader.readAsDataURL(this.fileToUpload);
  }

  addCourseType(){

    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
    this.imageUrl = reader.result;
    console.log("img", this.imageUrl);
    
    let payload = {
      "type": this.courseType,
      "user_image": this.imageUrl
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('coursetype');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course type added successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.data);
          this.display = "none";
        }
      });
    
    }
  }

  updateCourseType(){

    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
    this.imageUrl = reader.result;
    console.log("img", this.imageUrl);
    
    let payload = {
      "type": this.courseType,
      "user_image": this.imageUrl,
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('coursetype');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course type updated successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
        }
      });
    
    }
  }

  delete(){
    let payload = {
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('deletecoursetype');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Course type deleted successfully");
          this.displayDelete = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.message);
          this.showErr = true;
          this.deleteErr = resp.message;
        }
      });
  }


}
