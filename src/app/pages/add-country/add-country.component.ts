import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {

  display: any = "none";
  displayDelete: any = "none";

  countryForm: FormGroup;

  showAdd = false;
  showEdit = false;
  id: any;

  degreeForm: FormGroup;
  degreeType: any;
  showErr = false;
  deleteErr: any;
  country: any;

  error_messages = {
    'countryName': [
      { type: 'required', message: 'Please enter country name' },
    ],
  }
  countryVal: any;
  adminName: any;
  adminImage: any;
  allCountry: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder
  ) {

    this.countryForm = this.formBuilder.group({
      countryName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;

   }

  ngOnInit(): void {

    // GET COUNTRY \\
    const servicePathCountry = this.utils.getApiConfigs('country');
    console.log("servicePathCollege", servicePathCountry);
    this.commonservice.invokeService(servicePathCountry[1].method, servicePathCountry[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.countryVal = resp.data;
          console.log("Country", this.country);
        }
        this.allCountry = this.countryVal;
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

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
    this.ngOnInit();
  }

  openAdd() {
    this.countryForm.reset();
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  editCountry(data){
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.id = data.id;
    this.country = data.country;
  }

  addCountry(){
    let payload = {
      "country": this.country
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('country');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Country added successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
        }
      });
  }

  updateCountry(){
    let payload = {
      "country": this.country,
      "id": this.id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('country');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Country updated successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
        }
      });
  }

  delete(){

  }

  deleteCountry(data){

  }

}
