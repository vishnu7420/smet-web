import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  display: any = "none";
  colleges: any;
  displayDelete: any = "none";
  fileToUpload: any;
  imageUrl: any;
  collegeId: any;
  videoUrl: any;

  videoForm: FormGroup;

  showErr = false;
  deleteErr: any;

  showEdit = false;
  showAdd = false;

  error_messages = {
    'imageVal': [
      { type: 'required', message: 'Please select image' },
    ],
    'colgVal': [
      { type: 'required', message: 'Please select college name' },
    ],
    'videoVal': [
      { type: 'required', message: 'Please enter video url' },
    ]
  }
  videos: any;
  id: any;
  adminName: any;
  adminImage: any;
  allVideos: any;
  allData: any;
  
  constructor(
    public utils: ApilistService,
    public commonservice: CommonService,
    public globalService: GlobalService,
    public formBuilder: FormBuilder,
  ) {
    this.imageUrl = 'assets/tenant-avatar.jpg';
    this.videoForm = this.formBuilder.group({
      imageVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      colgVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      videoVal: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    let admin = JSON.parse(localStorage.getItem('adminDetails'));
    let adminData = JSON.parse(admin);

    this.adminName = adminData[0].user_name;
    this.adminImage = adminData[0].image;
    
   }

  ngOnInit(): void {
     // Get All College \\
     const servicePathCollege = this.utils.getApiConfigs('college');
     console.log("servicePathCollege",servicePathCollege);
     this.commonservice.invokeService(servicePathCollege[1].method, servicePathCollege[1].path, '')
       .then((resp: any) => {
         if (resp.status_code == "200") {
           this.colleges = resp.data;
          console.log("Colleges", this.colleges);
         }
       });

      // Get All Videos \\
     const servicePathVideo = this.utils.getApiConfigs('allvideourl');
     console.log("servicePathCollege",servicePathVideo);
     this.commonservice.invokeService(servicePathVideo[0].method, servicePathVideo[0].path, '')
       .then((resp: any) => {
         if (resp.status_code == "200") {
           this.videos = resp.data;
          console.log("Videos", this.videos);
         }

         this.allVideos = this.videos;
       });
  }

  onChangeEvent(event){
    console.log("event", event);

    var val = event.target.value;
    console.log("val", val);

    this.allData = this.videos;

    console.log("All Data", this.allData);

    if (val) {
      this.allVideos = this.allData.filter(item =>
        (item.college_name).toLowerCase().includes((val).toLowerCase()) 
      )
    }

    console.log("Courses Data", this.allVideos);
    if(this.allVideos == ""){
      this.globalService.showError("No data found");
    }
  }

  reset(){
    this.ngOnInit();
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

  openAdd(){
    this.display = "block";
    this.showAdd = true;
    this.showEdit = false;
  }

  onCloseHandled(){
    this.display = "none";
    this.displayDelete = "none";
  }

  editVideo(data){
    console.log("data", data);
    this.display = "block";
    this.showAdd = false;
    this.showEdit = true;

    this.videoUrl = data.url;
    this.imageUrl = data.image;
    this.collegeId = data.college_id;
  }

  deleteVideo(data){
    console.log("data", data);
    this.displayDelete = "block";
    this.id = data.id;
  }

  addVideo(){
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
    this.imageUrl = reader.result;
    console.log("img", this.imageUrl);

    let payload = {
      "college_id": this.collegeId,
      "url": this.videoUrl,
      "user_image": this.imageUrl
    }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('videourl');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Video added Successfully");
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.data);
        }
      });
    }
  }

  updateVideo(){
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = () => {
      // console.log("Filesssssssss", reader.result);
    this.imageUrl = reader.result;
    console.log("img", this.imageUrl);

    let payload = {
      "college_id": this.collegeId,
      "url": this.videoUrl,
      "user_image": this.imageUrl
    }

    console.log("payload", payload);
    const servicePath = this.utils.getApiConfigs('videourl');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Video added Successfully");
          this.ngOnInit();
        }else if(resp.status_code == "400"){
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
    const servicePath = this.utils.getApiConfigs('deletecollegevideo');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((resp: any) => {
        console.log("resp", resp);
        if (resp.status_code == "200") {
          console.log(resp);
          this.globalService.showSuccess("Video URL deleted successfully");
          this.displayDelete = "none";
          this.ngOnInit();
        }else if(resp.status_code == "400"){
          this.globalService.showError(resp.data);
          console.log("data", resp.data);
          this.showErr = true;
          this.deleteErr = resp.data;
        }
      });
  }

}
