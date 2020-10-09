import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';

import * as moment from 'moment';

@Component({
  selector: 'app-adimages',
  templateUrl: './adimages.component.html',
  styleUrls: ['./adimages.component.scss']
})
export class AdimagesComponent implements OnInit {
  display: any = "none";
  displayDelete: any = "none";
  showAdd = false;
  showEdit = false;
  imgTypeId: any;

  fileToUpload: any;
  imageUrl: any;
  imgType: any;
  imgData: any;
  id:any;

  showErr = false;
  deleteErr: any;
  countryid:any;
  countryVal: any;
  trendingCourse: any;
  foreignCourse: any;
  adminName: any;
  adminImage: any;
  allCountry: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
  ) { 

    this.imageUrl = 'assets/tenant-avatar.jpg';

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
  }

  ngOnInit(): void {

    // Dashboard Type \\
    const servicePathType = this.utils.getApiConfigs('dashboardtype');
    console.log("servicePathCollege", servicePathType);
    this.commonservice.invokeService(servicePathType[0].method, servicePathType[0].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.imgType = resp.data;
          console.log("Img type", this.imgType);
        }
      });

    // GET COUNTRY \\
    const servicePathCountry = this.utils.getApiConfigs('country');
    console.log("servicePathCollege", servicePathCountry);
    this.commonservice.invokeService(servicePathCountry[1].method, servicePathCountry[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.countryVal = resp.data;
          console.log("Country", this.countryVal);
        }
        this.allCountry = this.countryVal;
      });

    // Dashboard Image \\
    const servicePathCollege = this.utils.getApiConfigs('dashboard');
    console.log("servicePathCollege", servicePathCollege);
    this.commonservice.invokeService(servicePathCollege[1].method, servicePathCollege[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.imgData = resp.data;
          for (var i = 0; i < this.imgData.length; i++) {
            var date = this.imgData[i].date;
            date = moment().format("DD-MM-YYYY");
            console.log("Date", date);
            this.imgData[i]["displayDate"] = date;
          }
        }
      });

    // Trending courses \\
    const servicePathTrending = this.utils.getApiConfigs('alltrendingcourse');
    this.commonservice.invokeService(servicePathTrending[0].method, servicePathTrending[0].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.trendingCourse = resp.data;
          console.log("Trending course", this.trendingCourse);
        }
      });
    
    // Foreign University \\  
    const servicePathForeign = this.utils.getApiConfigs('allforeignuniversity');
    this.commonservice.invokeService(servicePathForeign[0].method, servicePathForeign[0].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.foreignCourse = resp.data;
          console.log("Forregin", this.foreignCourse);
        }
      });
  }

onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.countryVal;

    console.log("All Data", this.allData);

    if (val) {
      this.allCountry = this.allData.filter(item =>
        (item.country).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allCountry);
    if(this.allCountry == ""){
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

  editImage(data) {
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.imgTypeId = data.type_id;
    this.imageUrl = data.image;
    this.id = data.id;
    this.countryid = data.country_id;
  }

  deleteImage(data){
    this.displayDelete = "block";
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

  addImages() {

    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
      this.imageUrl = reader.result;
      console.log("img", this.imageUrl);

      let payload = {
        "type_id": this.imgTypeId,
        "user_image": this.imageUrl,
        "country_id": this.countryid,
      }
      console.log("payload", payload);
      const servicePath = this.utils.getApiConfigs('dashboard');
      this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
        .then((resp: any) => {
          console.log("resp", resp);
          if (resp.status_code == "200") {
            console.log(resp);
            this.globalService.showSuccess("Image Added Successfully");
            this.display = "none";
            this.ngOnInit();
          } else if (resp.status_code == "400") {
            this.globalService.showError(resp.data);
            console.log("data", resp.data);
          }
        });
    }
  }

  imgUpdate() {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
      this.imageUrl = reader.result;
      console.log("img", this.imageUrl);

      let payload = {
        "id": this.id,
        "type_id": this.imgTypeId,
        "user_image": this.imageUrl,
        "country_id": this.countryid,
        }
      
      console.log("payload", payload);
      const servicePath = this.utils.getApiConfigs('dashboard');
      this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
        .then((resp: any) => {
          console.log("resp", resp);
          if (resp.status_code == "200") {
            console.log(resp);
            this.globalService.showSuccess("Image Updated Successfully");
            this.display = "none";
            this.ngOnInit();
          } else if (resp.status_code == "400") {
            this.globalService.showError(resp.data);
            console.log("data", resp.data);
          }
        });
    }
  }


  delete(){
    let payload = {
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('dashboard');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess(resp.data);
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
