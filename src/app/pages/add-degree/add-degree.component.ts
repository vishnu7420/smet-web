import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-degree',
  templateUrl: './add-degree.component.html',
  styleUrls: ['./add-degree.component.scss']
})

export class AddDegreeComponent implements OnInit {
  display: any = "none";
  displayDelete: any = "none";
  degree:any;
  degreeData: any;

  showAdd = false;
  showEdit = false;
  id: any;

  degreeForm: FormGroup;

  degreeType: any;

  showErr = false;

  error_messages = {
    'degreeName': [
      { type: 'required', message: 'Please enter degree' },
    ],
    'degreetypeVal': [
      { type: 'required', message: 'Please select degree type' },
    ],
  }
  deleteErr: any;
  degreeTypeData: any;
  adminName: any;
  adminImage: any;
  allDegree: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder
  ) { 
    this.degreeForm = this.formBuilder.group({
      degreeName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      degreetypeVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
  }

  ngOnInit(): void {
    const servicePath = this.utils.getApiConfigs('degree');
    console.log("servicePath", servicePath);
    this.commonservice.invokeService(servicePath[1].method, servicePath[1].path, '')
      .then((resp: any) => {
        console.log("District", resp);
        if (resp.status_code == "200") {
          this.degreeData = resp.data;
        }
        this.allDegree = this.degreeData;
      });

      // GET DEGREE TYPE \\
      const servicePathDegree = this.utils.getApiConfigs('degreetype');
      console.log("servicePath", servicePath);
      this.commonservice.invokeService(servicePathDegree[1].method, servicePathDegree[1].path, '')
        .then((resp: any) => {
          console.log("District", resp);
          if (resp.status_code == "200") {
            this.degreeTypeData = resp.data;
          }
      });
  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.degreeData;

    console.log("All Data", this.allData);

    if (val) {
      this.allDegree = this.allData.filter(item =>
        (item.degree).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allDegree);
    if(this.allDegree == ""){
      this.globalService.showError("No data found");
    }
  }

  reset(){
    this.ngOnInit();
  }

  openAdd() {
    this.degreeForm.reset();
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  editDegree(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.degree = data.degree;
    this.id = data.id;
    this.degreeType = data.type_id;
    console.log("Degree type", this.degreeType);
  }

  deleteDegree(data){
    this.displayDelete = "block";
    this.id = data.id;
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
    this.ngOnInit();
  }

  addDegree(){
    let payload = {
      "degree":this.degree,
      "type_id": this.degreeType,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('degree');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Degree added successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
        }
      });
  }

  updateDegree(){
    let payload = {
      "degree":this.degree,
      "type_id": this.degreeType,
      "id": this.id,
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('degree');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Degree updated successfully");
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
    const servicePath = this.utils.getApiConfigs('deletedegree');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Degree deleted successfully");
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
