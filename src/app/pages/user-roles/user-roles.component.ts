import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  display: any = "none";
  showAdd:any;
  showEdit:any;
  userRole:any;
  userDetail: any;
  id: any;

  img: any;
  adminName: any;
  adminImage: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService : GlobalService
  ) {
    this.img = 'assets/side-menu/users-roles2.png';

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
   }

  ngOnInit(): void {
    const servicePath = this.utils.getApiConfigs('userroles');
    console.log("servicePath", servicePath);
    this.commonservice.invokeService(servicePath[1].method, servicePath[1].path, '')
      .then((resp: any) => {
        console.log("User role", resp);
        if (resp.status_code == "200") {
          this.userDetail = resp.data;
        }
      });
  }

  openAdd() {
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  editRole(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.userRole = data.roles;
    this.id = data.id;
  }

  onCloseHandled() {
    this.display = "none";
  }

  addUserRole(){
    let payload = {
      "roles":this.userRole
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('userroles');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Userrole added successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
        }
      });
  }

  updateUserRolee(){
    let payload = {
      "roles":this.userRole,
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('userroles');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Userrole updated successfully");
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
