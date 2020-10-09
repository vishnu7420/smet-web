import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss']
})
export class AdminUpdateComponent implements OnInit {

  fileToUpload: any;
  imageUrl: any;
  adminDetails: any;
  name: any;
  phonenumber: any;
  emailId: any;
  password: any;
  userRole: any;
  userRoleData: any;
  id:any;

  place: any;
  district: any;
  dob: any;
  father_name: any;
  institution_name: any;
  prefered_course: any;
  img:any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalServices: GlobalService,
    public router: Router,
  ) {

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    this.adminDetails = JSON.parse(admin);
    console.log("user", this.adminDetails);

    this.name = this.adminDetails[0].user_name;
    this.phonenumber = this.adminDetails[0].phone_num;
    this.emailId = this.adminDetails[0].email_id;
    this.password = this.adminDetails[0].password;
    this.imageUrl = this.adminDetails[0].image;
    this.id = this.adminDetails[0].id;
    this.place = this.adminDetails[0].place;
    this.district = this.adminDetails[0].district;
    let date = this.adminDetails[0].dob;
    date = moment(date).format("YYYY-MM-DD");
    this.dob = date;
    this.father_name = this.adminDetails[0].father_name;
    this.institution_name = this.adminDetails[0].institution_name;
    this.prefered_course = this.adminDetails[0].prefered_course;
    
    console.log("image", this.img);
  }

  ngOnInit(): void {
    const servicePath = this.utils.getApiConfigs('userroles');
    console.log("servicePath", servicePath);
    this.commonservice.invokeService(servicePath[1].method, servicePath[1].path, '')
      .then((resp: any) => {
        console.log("User role", resp);
        if (resp.status_code == "200") {
          this.userRoleData = resp.data;
          for(var i = 0; i < this.userRoleData.length; i++){
            if(this.adminDetails[0].role_id == this.userRoleData[i].id){
              console.log("this.userRoleData[i].roles", this.userRoleData[i].roles);
              this.userRole = this.userRoleData[i].id;
            }
          }
        }
      });
  }

  handleFileInput(file: FileList) {
    console.log("File", file);
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      // console.log("img", this.imageUrl);
    }

    reader.readAsDataURL(this.fileToUpload);
  }

  updateAdmin() {

    console.log("DOB", this.dob);
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      
      this.imageUrl = reader.result;
      console.log("img", this.imageUrl);

      let payload = {

        "id": this.id,
        "role_id": this.userRole,
        "user_name": this.name,
        "phone_num": this.phonenumber,
        "email_id": this.emailId,
        "password": this.password,
        "place": "",
        "district": "",
        "dob": this.dob,
        "father_name": "",
        "institution_name": "",
        "prefered_course": "",
        "user_image": this.imageUrl
      }

      console.log("payload", payload);
      const servicePath = this.utils.getApiConfigs('users');
      this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
        .then((resp: any) => {
          console.log("resp", resp);
          if (resp.status_code == "200") {
            console.log(resp);
            this.globalServices.showSuccess("Admin updated successfully");
            this.router.navigate(['/sign-in']);
          } else if (resp.status_code == "400") {
            console.log("data", resp.data);
            this.globalServices.showError(resp.data);
          }
        });
    }
  }

}
