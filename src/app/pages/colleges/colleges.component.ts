import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.scss']
})
export class CollegesComponent implements OnInit {

  display: any = "none";
  displayDelete: any = "none";
  showAdd = false;
  showEdit = false;
  collegeName:any;
  city:any;
  stateid:any;
  address:any;
  stateData:any;
  disrictData:any;
  phonenumber:any;
  emailAddress:any;

  fileToUpload: any;
  imageUrl: any;
  colleges: any;
  id: any;
  searchData: any[];
  allData: any;

  addCollegeForm: FormGroup;

  showErr = false;

  scopeId: any;
  scopeIdArray = [];
  fees: any;

  scopeAmount: any;

  objectives: any;

  error_messages = {
    'email': [
      { type: 'required', message: 'please enter email address.' },
      { type: 'pattern', message: 'Please enter a valid email address.' },
    ],
    'clgImg': [
      { type: 'required', message: 'Please select image' },
    ],
    'clgName': [
      { type: 'required', message: 'Please enter college name' },
    ],
    'phoneno': [
      { type: 'required', message: 'Please enter phone number' },
    ],
    'clgAddress': [
      { type: 'required', message: 'Please enter address' },
    ],
    'clgDistrict':[
      { type: 'required', message: 'Please select district' },
    ],
    'clgState': [
      { type: 'required', message: 'Please select state' },
    ],
    'objectivesVal': [
      { type: 'required', message: 'Please enter objectives of college' },
    ],
    'courseVal':[
      { type: 'required', message: 'Please select course' },
    ],
    'feesVal':[
      { type: 'required', message: 'Please enter fees' },
    ],
    'degreeTypeVal': [
      { type: 'required', message: 'Please select degree' },
    ],
    'ugcourse': [
      { type: 'required', message: 'Please select ug course' },
    ],
    'ugfeesVal': [
      { type: 'required', message: 'Please select ug fees' },
    ],
    'pgcoursesVal': [
      { type: 'required', message: 'Please select pg course' },
    ],
    'pgfeesVal': [
      { type: 'required', message: 'Please select pg fees' },
    ],
    'phdcourseVal': [
      { type: 'required', message: 'Please select phd course' },
    ],
    'clgObjectives': [
      { type: 'required', message: 'Please enter college objectives' },
    ],
    'videoVal': [
      { type: 'required', message: 'Please enter video url' },
    ],
    'colgImg': [
      { type: 'required', message: 'Please select clg images' },
    ],
    'checkVal': [
      { type: 'required', message: 'Please select course' },
    ], 
    'trustFeesVal': [
      { type: 'required', message: 'Please enter trust fees' },
    ]
  }

  images = [];
  degreeType: any;
  ug: any;
  ugfees: any;
  pgcourse: any;
  pgfees: any;
  phdcourse: any;
  video: any;
  deleteErr: any;
  scopeData: any;
  adminName: any;
  adminImage: any;

  
  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder
  ) {
    this.imageUrl = 'assets/tenant-avatar.jpg';

    this.addCollegeForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])),

      clgImg: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      clgName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      
      phoneno: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      clgAddress: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      clgDistrict: new FormControl('', Validators.compose([
        Validators.required,
      ])), 

      clgState: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      objectivesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])), 

      courseVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      
      feesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      degreeTypeVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      ugcourse: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      ugfeesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      pgcoursesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      pgfeesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      phdcourseVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      clgObjectives: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      videoVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      colgImg: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      checkVal: new FormControl('', Validators.compose([
        Validators.required,
      ])), 

      trustFeesVal: new FormControl('', Validators.compose([
        Validators.required,
      ])), 

    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;

   }

  ngOnInit(): void {

    this.addCollegeForm.reset();
    
    // Get All College \\
    const servicePathCollege = this.utils.getApiConfigs('college');
    console.log("servicePathCollege",servicePathCollege);
    this.commonservice.invokeService(servicePathCollege[1].method, servicePathCollege[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.colleges = resp.data;
          for (var i = 0; i < this.colleges.length; i++) {
            var date = this.colleges[i].date;
            date = moment().format("DD-MM-YYYY");
            console.log("Date", date);
            this.colleges[i]["displayDate"] = date;
          }
        }

      });

    // Get All State \\
    const servicePathstate = this.utils.getApiConfigs('state');
    this.commonservice.invokeService(servicePathstate[0].method, servicePathstate[0].path, '')
      .then((resp: any) => {
        // console.log("State", resp);
        if (resp.status_code == "200") {
          this.stateData = resp.data;
          for (var i = 0; i < this.colleges.length; i++) {
            for(var j = 0; j < this.stateData.length; j++){
              if(this.colleges[i].state == this.stateData[j].id){
                this.colleges[i]["stateName"] = this.stateData[j].state;
              }
            }
          }
          console.log("College State", this.colleges);
        }
      });

    // Get All District \\
    const servicePathDistrict = this.utils.getApiConfigs('district');
    this.commonservice.invokeService(servicePathDistrict[0].method, servicePathDistrict[0].path, '')
      .then((resp: any) => {
        console.log("District", resp);
        if (resp.status_code == "200") {
          this.disrictData = resp.data;

          for (var i = 0; i < this.colleges.length; i++) {
            for(var j = 0; j < this.disrictData.length; j++){
              if(this.colleges[i].district == this.disrictData[j].id){
                this.colleges[i]["districtName"] = this.disrictData[j].district;
              }
            }
          }
        }
        this.searchData = this.colleges;
        console.log("College District", this.searchData);
      });

      // Get Scope \\
    const servicePathscope = this.utils.getApiConfigs('scope');
    this.commonservice.invokeService(servicePathscope[1].method, servicePathscope[1].path, '')
      .then((resp: any) => {
        if (resp.status_code == "200") {
          this.scopeData = resp.data;
          // for (var i = 0; i < this.scopeData.length; i++) {
          //   this.scopeData[i]["amount"] = "";
          // }
          console.log("Scope", this.scopeData);
        }
      });

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

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.colleges;

    console.log("All Data", this.allData);

    if (val) {
      this.searchData = this.allData.filter(item =>
        (item.collage_name).toLowerCase().includes((val).toLowerCase()) || (item.districtName).toLowerCase().includes((val).toLowerCase()) || (item.stateName).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Search Data", this.searchData);
  }

  reset(){
    this.ngOnInit();
  }

  openAdd() {
    this.addCollegeForm.reset();
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  addMultiImgs(event) {
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

  onCheckChange(event){
    console.log(this.scopeData);
    console.log("event", event);
    // if(event.target.checked == true){
    //   this.scopeIdArray.push(event.target.ngValue);
    // }

    console.log("Scope Array", this.scopeIdArray);
    // console.log("scope Amount");
  }

  addCollege(){
    
    console.log("Scope Details", this.scopeData);

    for(var i = 0; i < this.scopeData.length; i++){
      if((this.scopeData[i].fees != null) && (this.scopeData[i].trustFees)){
        this.scopeIdArray.push({scope_id: this.scopeData[i].id, fees: this.scopeData[i].fees, trust_fees: this.scopeData[i].trustFees});
      }
    }
  
    console.log("Final Scope", this.scopeIdArray);

    let payload = {
      // "college_name":this.collegeName,
      // "state":this.stateid,
      // "district": this.city,
      // "address":this.address,
      // "contact_no":this.phonenumber,
      // "contact_email":this.emailAddress,
      // "user_image": this.imageUrl

      "college_name": this.collegeName,
      "state": this.stateid,
      "district": this.city,
      "address": this.address,
      "contact_no": this.phonenumber,
      "contact_email": this.emailAddress,
      "scopes": this.scopeIdArray,
      "description": this.objectives,
      "user_image": this.imageUrl,
    }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('college');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("College Added Successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.data);
        }
      });
  }

  editCollege(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.collegeName = data.collage_name;
    this.phonenumber = data.contact_no;
    this.emailAddress = data.contact_email;
    this.address = data.address;
    this.city = data.district;
    this.stateid = data.state;
    this.imageUrl = data.image;
    this.objectives = data.description;
    this.id = data.id;
  }

  updateCollege(){
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
    this.imageUrl = reader.result;
    console.log("img", this.imageUrl);

    let payload = {
      "id": this.id,
      "collage_name": this.collegeName,
      "state": this.stateid,
      "district": this.city,
      "address": this.address,
      "contact_no": this.phonenumber,
      "contact_email": this.emailAddress,
      "description": this.objectives,
      "user_image": this.imageUrl

      // "collage_name":this.collegeName,
      // "state":this.stateid,
      // "district": this.city,
      // "address":this.address,
      // "contact_no":this.phonenumber,
      // "contact_email":this.emailAddress,
      // "user_image": this.imageUrl,
      // "id": this.id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('editcollege');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("College details updated Successfully");
          this.display = "none";
          this.ngOnInit();
          // this.router.navigate(['dashboard']);
        }else if(resp.status_code == "400"){
          console.log("data", resp.data);
          this.globalService.showError(resp.data);
        }
      });
    }
  }

  deleteCollege(data){
    console.log("data", data);

    this.displayDelete = 'block';

    this.id = data.id;
  }

  delete(){
    let payload = {
      "id": this.id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('deletecollege');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess(resp.data);
          this.displayDelete = 'none';
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          console.log("data", resp.message);
          this.showErr = true;
          this.deleteErr = resp.message;
        }
      });
  }

  onCloseHandled() {
    this.display = "none";
    this.displayDelete = "none";
  }

}
