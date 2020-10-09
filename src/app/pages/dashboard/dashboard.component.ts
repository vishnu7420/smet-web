import { Component, OnInit, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations'
// import { SlideInOutAnimation } from '../animations';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],  
  animations: [
    trigger('toggleBox', [
      // ...
      state('open', style({
        height: 'auto',
        backgroundColor: 'transparent',
      })),
      state('closed', style({
        height: '0px',
        backgroundColor: 'transparent',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class DashboardComponent implements OnInit {
  display: any = "none";
  dashboardData: any;
  totalColg: any;
  totalCourse: any;
  totalStudents: any;
  trendingCourse: any;
  abroardUniver: any;
  studentDetails: any;

  hideSideNav: boolean;
  showTour: any;
  flag: boolean = true;
  showClose: boolean = true;
  showMenu: boolean = false;

  @ViewChild('el') elRefs: ElementRef;

  isOpen = false;
  animationState = 'out';

  showAdd = false;
  showEdit = false;

  studentForm: FormGroup;
  phonenumber:any;
  studentName:any;
  emailAddress:any;
  clgName:any;
  fatherName: any;
  place: any;
  district: any;
  dob: any;
  bloodGroup: any;
  password: any;
  confirmPassword: any;
  showErr = false;
  preferredCourse: any;
  qualification: any;
  referral: any;
  userRole:any;
  preferedCourseEdit:any[];

  error_messages = {
    'studentImg': [
      { type: 'required', message: 'please select student image' },
    ],
    'userRoleVal': [
      { type: 'required', message: 'please enter user role' },
    ],
    'studentNameVal': [
      { type: 'required', message: 'please enter student name' },
    ],
    'phoneno': [
      { type: 'required', message: 'please enter student whatsapp number' },
      { type: 'maxlength', message: 'Phone Number should be 10 digit' },
      { type: 'minlength', message: 'Phone Number should be 10 digit' },
      { type: 'pattern', message: 'Phone Number should be Numbers only' }
    ], 
    'email': [
      { type: 'required', message: 'please enter email address' },
      { type: 'pattern', message: 'Please enter a valid email address' },
    ],
    'colgVal': [
      { type: 'required', message: 'please enter school or college name' },
    ],
    'fatherNameVal': [
      { type: 'required', message: 'please enter father name' },
    ],
    'qualificationVal': [
      { type: 'required', message: 'please enter student educational qualification' },
    ],
    'placeVal': [
      { type: 'required', message: 'please enter place' },
    ],
    'districtVal': [
      { type: 'required', message: 'please select district' },
    ],
    'dobVal': [
      { type: 'required', message: 'please select date of birth' },
    ],
    'bloodGroupVal': [
      { type: 'required', message: 'please enter blood group' },
    ],
    'paswdVal': [
      { type: 'required', message: 'please enter password' },
    ],
    'confirmPass': [
      { type: 'required', message: 'please enter confirm password' },
    ],
    'preferredCourseVal': [
      { type: 'required', message: 'please select preferred courses' },
    ],
    'referralVal': [
      { type: 'required', message: 'please enter referral code' },
    ],
  }
  imageUrl: any;
  fileToUpload: File;
  disrictData: any;
  userRoleData: any;
  id: any;
  adminName: any;
  adminImage: any;
  allStudents: any;
  allData: any;

  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public router: Router,
    public ngzone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public formBuilder: FormBuilder,
    public globalService: GlobalService
  ) {

    this.imageUrl = 'assets/tenant-avatar.jpg';
    
    this.studentForm = this.formBuilder.group({
      studentImg: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      userRoleVal: new FormControl('', Validators.compose([
        Validators.required,
      ])), 
      studentNameVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phoneno: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])),
      colgVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      fatherNameVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      qualificationVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      placeVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      districtVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dobVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      bloodGroupVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      paswdVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      confirmPass: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      preferredCourseVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      referralVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    },{ 
      validators: this.passwordValidate.bind(this),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
   }

   passwordValidate(formGroup: FormGroup) {
    const { value: password } = formGroup.get('paswdVal');
    const { value: confirmPassword } = formGroup.get('confirmPass');
    if(password === confirmPassword){
      this.showErr = false;
    }else{
      this.showErr = true;
    }
  }

  ngOnInit(): void {
    // Get Dashboard Data \\
    const servicePath = this.utils.getApiConfigs('count');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((resp: any) => {
        console.log("Dashboard", resp);
        if (resp.status_code == "200") {
          this.dashboardData = resp.data;

          for (var i = 0; i < this.dashboardData.length; i++) {
              if(this.dashboardData[i].type == 'College'){
                this.totalColg = this.dashboardData[i].total;
              }else if(this.dashboardData[i].type == 'Courses'){
                this.totalCourse = this.dashboardData[i].total;
              }else if(this.dashboardData[i].type == 'Students'){
                this.totalStudents = this.dashboardData[i].total;
              }else if(this.dashboardData[i].type == 'Trending Course'){
                this.trendingCourse = this.dashboardData[i].total;
              }else if(this.dashboardData[i].type == 'Abroad University'){
                this.abroardUniver = this.dashboardData[i].total;
              }
          }
          console.log("total", this.totalColg);
        }
      });

    // Get All Students \\
    const servicePathStud = this.utils.getApiConfigs('studentlist');
    this.commonservice.invokeService(servicePathStud[0].method, servicePathStud[0].path, '')
      .then((resp: any) => {
        console.log("Students", resp);
        if (resp.status_code == "200") {
          this.studentDetails = resp.data;

          for (var i = 0; i < this.studentDetails.length; i++) {
              let date = this.studentDetails[i].date;
              date = moment().format("DD-MM-YYYY");
              this.studentDetails[i]["displayDate"] = date;
              
              let dateOF = this.studentDetails[i].dob; 
              this.studentDetails[i]["dateOfBirth"] = moment(dateOF).format("DD-MM-YYYY");
          }
        }

        this.allStudents = this.studentDetails;
      });

      // Get All District \\
    const servicePathDistrict = this.utils.getApiConfigs('district');
    this.commonservice.invokeService(servicePathDistrict[0].method, servicePathDistrict[0].path, '')
      .then((resp: any) => {
        console.log("District", resp);
        if (resp.status_code == "200") {
          this.disrictData = resp.data;
          console.log("District", this.disrictData);
        }
      });

      // GET USER ROLE \\
      const servicePathuser = this.utils.getApiConfigs('userroles');
      this.commonservice.invokeService(servicePathuser[1].method, servicePathuser[1].path, '')
      .then((resp: any) => {
        console.log("User role", resp);
        if (resp.status_code == "200") {
          this.userRoleData = resp.data;
          console.log("Usersss", this.userRoleData);
          // for(var i = 0; i < this.userRoleData.length; i++){
          //   if(this.adminDetails[0].role_id == this.userRoleData[i].id){
          //     console.log("this.userRoleData[i].roles", this.userRoleData[i].roles);
          //     this.userRole = this.userRoleData[i].id;
          //   }
          // }
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

    this.allData = this.studentDetails;

    console.log("All Data", this.allData);

    if (val) {
      this.allStudents = this.allData.filter(item =>
        (item.user_name).toLowerCase().includes((val).toLowerCase()) || (item.phone_num).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Students Data", this.allStudents);

    if(this.allStudents == ""){
      this.globalService.showError("No data found");
    }
  }

  reset(){
    this.ngOnInit();
  }

  openAdd(){
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  editStudent(data){
    console.log("Data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.studentName = data.user_name;
    this.phonenumber = data.phone_num;
    this.emailAddress = data.email_id;
    this.password = data.password;
    this.confirmPassword = data.password;
    this.place = data.place;
    this.district = data.district;
    this.dob = data.dob;
    this.fatherName = data.father_name;
    this.clgName = data.institution_name;
    this.preferredCourse = data.prefered_course;
    this.qualification = data.educational_qualification;
    this.id = data.id;
    this.userRole = data.role_id;
  }

  addStudent(){
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
    this.imageUrl = reader.result;
    console.log("img", this.preferredCourse);

    let preferedCourse = []; 
    preferedCourse = this.preferredCourse.split(',');
    console.log("prefered course", preferedCourse);

    let payload = {
      "role_id": this.userRole,
      "name": this.studentName,
      "phone_number": this.phonenumber,
      "email_id": this.emailAddress,
      "password": this.confirmPassword,
      "place": this.place,
      "district": this.district,
      "dob": this.dob,
      "father_name": this.fatherName,
      "institution_name": this.clgName,
      "prefered_course": preferedCourse,
      "educational_qualification": this.qualification,
      "referred_code": this.referral,
      "user_image": this.imageUrl
    }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('users');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Student Added Successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.data);
        }
      });
    }
  }

  updateStudent(){
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
    this.imageUrl = reader.result;
    console.log("prefered course", this.preferredCourse);

    this.preferedCourseEdit = this.preferredCourse;

    console.log("this.==========>>>>>>", this.preferedCourseEdit);

    // let preferedCourse = []; 
    // preferedCourse = this.preferredCourse.split(',');
    // console.log("prefered course", preferedCourse);

    let dob = moment(this.dob).format("YYYY-MM-DD");

    let payload = {
      "id": this.id,
      "role_id": this.userRole,
      "user_name": this.studentName,
      "phone_num": this.phonenumber,
      "email_id": this.emailAddress,
      "password": this.confirmPassword,
      "place": this.place,
      "district": this.district,
      "dob": dob,
      "father_name": this.fatherName,
      "institution_name": this.clgName,
      "prefered_course": this.preferredCourse,
      "user_image":this.imageUrl,
      "educational_qualification": this.qualification,
    }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('users');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Student updated successfully");
          this.display = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.data);
        }
      });
    }
  }

  /**
   * Close modal when click close button
   */
  onCloseHandled() {
    this.display = "none";
  }
  /**
   * click ok to logout from the app
   */
  ok() {

    console.log("Logout");
    this.router.navigate(['/sign-in']);

    // this.showError = false;
    // let servicePath = this.utils.getApiConfigs("logout");
    // this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
    //   .then((respVal: any) => {
    //     if (respVal.payload.status == 200) {
    //       localStorage.clear();
    //       this.authservice.userActive.next(false);
    //       this.router.navigate(['/signin']);
    //     } else {
    //       this.showError = true;
    //       this.ErrorMsg = "Failed to logout";
    //       // const modalRef = this.modalService.open(ModalPopupComponent);
    //       // modalRef.componentInstance.flag = 'expire';
    //       this.router.navigate(['/signin']);
    //     }
    //   });
  }
  // goPage(num, page, flag) {
  //   console.log("num","Page", "Flag", num, page, flag);
  //   if (page != undefined) {
  //     if (page != 'logout') {
  //       let url = '/' + page + '';
  //       this.router.navigate([url])
  //     } else {
  //       this.logout();
  //     }
  //   }
  //   this.hideMenu();
  // }
  hideMenu() {
    if (this.commonservice.screenWidth <= 910) {
      this.commonservice.showTour = { 'margin-left': '-250px' }
    } else {
      this.commonservice.showTour = { 'margin-left': '0px' }
    }
  }

  notallow() {
    // this.router.navigate(['/signin']);
    this.display = "none";
    // localStorage.clear();
  }

}
