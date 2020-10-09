import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {
  display: any = "none";
  allFloors: any;
  newFloor: any;
  constructor(public commonservice: CommonService, public utils: ApilistService) { }

  ngOnInit(): void {
    this.getallFloor();
  }
  openAdd() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  getallFloor() {
    const servicePath = this.utils.getApiConfigs('getfloor');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((data: any) => {
        if (data.status_code == "200") {
          this.allFloors = data.data;
        }
      })
  }
  addFloor() {
    let payload = {
      "floor": this.newFloor
    }
    const servicePath = this.utils.getApiConfigs('addfloor');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((data: any) => {
        if (data.status_code == "200") {
          this.getallFloor();
          this.display = "none";
          console.log(data)
        }

      });
  }

}
