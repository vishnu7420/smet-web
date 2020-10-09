import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ApilistService } from 'src/app/services/apilist.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {
  display: any = "none";
  userForm: FormGroup;
  userImage: any;
  tenants: any;
  selectFlag: boolean;
  temp1: string | ArrayBuffer;
  addForm: boolean;
  getTenantId: any;
  savedImage: any;

  constructor(private formData: FormBuilder, public commonservice: CommonService, public utils: ApilistService) {
    this.userForm = this.formData.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
        ),
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[6-9]\\d{9}')])],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.allTenants();
  }
  allTenants() {
    const servicePath = this.utils.getApiConfigs('getTenants');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((data: any) => {
        if (data.status_code == "200") {
          let getTenant = data.data;
          let temp = [];
          if (getTenant.length > 0) {
            getTenant.filter((res) => {
              if (res.role_id !== 1) {
                temp.push(res);
              }
              this.tenants = temp;
            })
          }
          console.log(this.tenants)
        }
      })
  }
  openAdd() {
    this.display = "block";
    this.userImage = this.commonservice.base64profile;
    this.addForm = true;
  }
  selectImage(event) {
    this.selectFlag = false;
    var reader = new FileReader();
    reader.onloadend = (e) => {
      this.selectFlag = true;
      this.userImage = reader.result;
      this.temp1 = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  addTenants() {
    let payload = {
      "role_id": 2,
      "name": this.userForm.get("name").value.trim(),
      "phone_number": this.userForm.get("phone").value.trim(),
      "email_id": this.userForm.get("email").value.trim(),
      "password": this.userForm.get("password").value.trim(),
      "Upload_1": this.selectFlag == true ? this.temp1 : this.commonservice.base64profile,
    }
    console.log(payload)
    const servicePath = this.utils.getApiConfigs('addTenants');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((data: any) => {
        if (data.status_code == "200") {
          this.display = "none"
          this.allTenants();
        }
      })
  }
  updatepopup(tenant) {
    this.addForm = false;
    this.getTenantId = tenant.id;
    this.userImage = tenant.profile_pic;
    this.savedImage = tenant.profile_pic;
    this.userForm.setValue({
      name: tenant.name,
      phone: tenant.phone_number,
      email: tenant.email_id,
      password: tenant.password,
    })
  }
  updateTenants() {
    let payload = {
      user_id: this.getTenantId,
      role_id: 2,
      name: this.userForm.get("name").value,
      mobile: this.userForm.get("phone").value,
      email: this.userForm.get("email").value,
      password: this.userForm.get("password").value,
      Upload_1: this.selectFlag ==  true ? this.temp1 : this.savedImage
    }
    console.log(payload)
  }
  onCloseHandled() {
    this.display = "none";
  }

}
