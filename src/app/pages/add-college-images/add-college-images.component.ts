import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-college-images',
  templateUrl: './add-college-images.component.html',
  styleUrls: ['./add-college-images.component.scss']
})
export class AddCollegeImagesComponent implements OnInit {

  showEdit = false;
  showAdd = false;
  display: any = "none";
  displayDelete: any = "none";
  fileToUpload: any;
  imageUrl: any;
  collegeId: any;

  images = [];
  colleges: any;

  collegeImagesForm: FormGroup;

  showErr = false;
  deleteErr: any;

  error_messages = {
    'collegeName': [
      { type: 'required', message: 'Please select college name' },
    ],
    'colgImg': [
      { type: 'required', message: 'Please select images' },
    ]
  }
  allImages: any;
  id: any;
  adminName: any;
  adminImage: any;
  allCollegeImages: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder,
  ) {
    this.collegeImagesForm = this.formBuilder.group({
      collegeName: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      colgImg: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
   }

  ngOnInit(): void {

    // GET ALL COLLEGE \\
    const servicePathCollege = this.utils.getApiConfigs('college');
    console.log("servicePathCollege",servicePathCollege);
    this.commonservice.invokeService(servicePathCollege[1].method, servicePathCollege[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.colleges = resp.data;
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
        }
      });

      // GET ALL COLLGE IMAGES \\
      const servicePathImages = this.utils.getApiConfigs('allcollegeimage');
      console.log("servicePathCollege",servicePathImages);
      this.commonservice.invokeService(servicePathImages[0].method, servicePathImages[0].path, '')
        .then((resp: any) => {
          if (resp.status_code == "200") {
            this.allImages = resp.data;
            console.log("Images", this.allImages);
          }else if(resp.status_code == "400"){
            this.globalService.showError(resp.data);
          }
          this.allCollegeImages = this.allImages;
        });

  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.allImages;

    console.log("All Data", this.allData);

    if (val) {
      this.allCollegeImages = this.allData.filter(item =>
        (item.collage_name).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allCollegeImages);
    if(this.allCollegeImages == ""){
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

  deleteImage(data){
    this.displayDelete = "block";
    this.id = data.id
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
  }

  handleFileInput(event) {
    console.log("event", event.target.files);

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {

          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  addImages(){
    console.log("Images", this.images);
    let payload = {
      "college_id": this.collegeId,
      "user_image": this.images,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('collegeimage');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Images Added Successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.data);
        }
      });
  }

  delete(){
    let payload = {
      "id" : this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('deletecollegeimage');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Image deleted successfully");
          this.displayDelete = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.message);
          this.showErr = true;
          this.deleteErr = resp.message;
        }
      });
  }


}
