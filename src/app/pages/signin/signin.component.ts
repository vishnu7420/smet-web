import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApilistService } from 'src/app/services/apilist.service';
import { NgxSpinnerService } from "ngx-spinner";
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: any;
  paswdValue: any;
  confirmPassValue: any;
  showErr = false;

  showLogin = true;
  showEmailverify = false;
  showOTPverify = false;
  showforgotPass = false;
  user_id: any;
  userDetails: any;
  otp: any;
  loginForm: FormGroup;
  emailVerifyForm: FormGroup;
  otpVerifyForm: FormGroup;
  changePassForm: FormGroup;
  
  submitted = false;

  error_messages = {
    'emailid': [
      { type: 'required', message: 'please enter email address.' },
      { type: 'pattern', message: 'Please enter a valid email address.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      // { type: 'minlength', message: 'password length.' },
    ],
    'verifyotp' :[
      { type: 'required', message: 'OTP is required.' },
      { type: 'maxlength', message: 'OTP should be 6 digit' },
      { type: 'minlength', message: 'OTP should be 4 digit' },
      { type: 'pattern', message: 'OTP should be Numbers only' }
    ],
  }

  constructor(
    private router: Router,
    public utils: ApilistService,
    public commonservice: CommonService,
    private SpinnerService: NgxSpinnerService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      emailid: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])),

      paswd: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])),
    });

    this.emailVerifyForm = this.formBuilder.group({
      verifyEmail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])),
    });

    this.otpVerifyForm = this.formBuilder.group({
      verifyOtp: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ])),
    });

    this.changePassForm = this.formBuilder.group({
      paswd: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),

      confirmPass: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.password.bind(this),
    });
   }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      console.log("spinner");
      this.SpinnerService.hide();
    }, 5000);
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('paswd');
    const { value: confirmPassword } = formGroup.get('confirmPass');
    this.paswdValue = password;
    if(password === confirmPassword){
      this.showErr = false;
    }else{
      this.showErr = true;
    }
  }

  signin() {
    this.SpinnerService.show();

    let payload = {
      "email_id": this.email,
      "password": this.paswdValue
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('login');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        this.SpinnerService.hide();
        if (resp.status_code == "200") {
          console.log(resp.data);
          this.globalService.setLocalStore('adminDetails', JSON.stringify(resp.data));
          this.router.navigate(['dashboard']);
        } else if (resp.status_code == "400") {
          console.log("data", resp.Messages);
          this.globalService.showError(resp.Messages);
        }
      });
    // this.router.navigate(['dashboard']);
  }

  forgotPassword() {
    this.showLogin = false;
    this.showEmailverify = true;
    this.showOTPverify = false;
    this.showforgotPass = false;
  }

  verify() {

    let user = JSON.parse(localStorage.getItem('adminDetails'));
    this.userDetails = JSON.parse(user);
    console.log("user", this.userDetails);
    this.user_id = this.userDetails[0].id;
    console.log("user", this.user_id);

    let payload = {
      "email_id": this.email,
      "user_id": this.user_id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('otp');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        this.SpinnerService.hide();
        if (resp.status_code == "200") {
          console.log(resp.data);
          this.globalService.showSuccess("OTP has been send to your Email. Please Verify.");
          this.showLogin = false;
          this.showEmailverify = false;
          this.showOTPverify = true;
          this.showforgotPass = false;
        } else if (resp.status_code == "400") {
          console.log("data", resp.message);
          this.globalService.showError(resp.message);
        }
      });

  }

  verifyOTP() {

    let user = JSON.parse(localStorage.getItem('adminDetails'));
    this.userDetails = JSON.parse(user);
    console.log("user", this.userDetails);
    this.user_id = this.userDetails[0].id;
    console.log("user", this.user_id);

    let payload = {
      "otp": this.otp,
      "user_id": this.user_id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('verifyotp');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        this.SpinnerService.hide();
        if (resp.status_code == "200") {
          console.log(resp.data);
          this.globalService.showSuccess("OTP verified successfully.");
          this.showLogin = false;
          this.showEmailverify = false;
          this.showOTPverify = false;
          this.showforgotPass = true;
        } else if (resp.status_code == "400") {
          console.log("data", resp.message);
          this.globalService.showError(resp.message);
        }
      });
  }

  resend() {
    this.verify();
  }

  backToLogin() {
    this.showLogin = true;
    this.showEmailverify = false;
    this.showOTPverify = false;
  }

  changePassword(){
    let user = JSON.parse(localStorage.getItem('adminDetails'));
    this.userDetails = JSON.parse(user);
    this.user_id = this.userDetails[0].id;
    console.log("user", this.user_id);
    console.log("Password", this.paswdValue);

    let payload = {
      "password": this.paswdValue,
      "user_id": this.user_id
    }
    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('editpassword');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        this.SpinnerService.hide();
        if (resp.status_code == "200") {
          console.log(resp.data);
          this.globalService.showSuccess(resp.data);
          this.showLogin = true;
          this.showEmailverify = false;
          this.showOTPverify = false;
          this.showforgotPass = false;
          this.ngOnInit();
        } else if (resp.status_code == "400") {
          console.log("data", resp.message);
          this.globalService.showError(resp.message);
        }
      });
  }

}
