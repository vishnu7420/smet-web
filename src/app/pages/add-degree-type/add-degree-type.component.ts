import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-degree-type',
  templateUrl: './add-degree-type.component.html',
  styleUrls: ['./add-degree-type.component.scss']
})
export class AddDegreeTypeComponent implements OnInit {
  display: any = "none";
  displayDelete: any = "none";
  degreeType: any;
  degreeTypeData: any;

  showAdd = false;
  showEdit = false;
  id:any;

  degreeTypeForm: FormGroup;

  showErr = false;

  error_messages = {
    'degreeTypeName': [
      { type: 'required', message: 'Please enter degree type' },
    ],
  }
  deleteErr: any;
  adminName: any;
  adminImage: any;
  allDegreeType: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder,
    ) { 
      this.degreeTypeForm = this.formBuilder.group({
        degreeTypeName: new FormControl('', Validators.compose([
          Validators.required,
        ])),
      });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;

    }

  ngOnInit(): void {
    const servicePath = this.utils.getApiConfigs('degreetype');
    console.log("servicePath", servicePath);
    this.commonservice.invokeService(servicePath[1].method, servicePath[1].path, '')
      .then((resp: any) => {
        console.log("District", resp);
        if (resp.status_code == "200") {
          this.degreeTypeData = resp.data;
        }
        this.allDegreeType = this.degreeTypeData;
      });
  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.degreeTypeData;

    console.log("All Data", this.allData);

    if (val) {
      this.allDegreeType = this.allData.filter(item =>
        (item.type).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allDegreeType);
    if(this.allDegreeType == ""){
      this.globalService.showError("No data found");
    }
  }

  reset(){
    this.ngOnInit();
  }

  openAdd() {
    this.degreeTypeForm.reset();
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  editDegreeType(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.degreeType = data.type;
    this.id = data.id;
  }

  deleteDegreeType(data){
    console.log("Data", data);
    this.displayDelete = 'block';
    this.id = data.id;
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
  }

  addDegreeType(){
    let payload = {
      "degree_type":this.degreeType
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('degreetype');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Degree type added successfully");
          this.display = "none";
          this.degreeTypeForm.reset();
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
        }
      });
  }

  updateDegreeType(){
    let payload = {
      "degree_type":this.degreeType,
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('degreetype');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Degree type updated successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
          this.display = "none";
        }
      });
  }

  delete(){
    let payload = {
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('deletedegreetype');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess(resp.data);
          this.displayDelete = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.message);
          this.deleteErr = resp.message;
          this.showErr = true;
        }
      });
  }

}
