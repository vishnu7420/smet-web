import { Component, OnInit } from '@angular/core';
import { ApilistService } from 'src/app/services/apilist.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  allRooms: any;
  display: any = "none";
  allFloors: any;
  floor_id: any;
  getType: any;
  price: any;
  roomNo: any;
  roomType:any;
  floor:any;

  constructor(public commonservice: CommonService, public utils: ApilistService) { }

  ngOnInit(): void {
    this.getallRooms();
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
  changeFloor(floor) {
    console.log(floor)
    this.floor_id = floor.id
  }
  changeType(type) {
    console.log(type)
    this.getType = type.type
  }
  getallRooms() {
    const servicePath = this.utils.getApiConfigs('getRooms');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, '')
      .then((data: any) => {
        if (data.status_code == "200") {
          this.allRooms = data.data;
        }
      })
  }
  addRoom() {
    let payload = {
      "floor_id": this.floor_id,
      "room_no": this.roomNo,
      "room_type": this.getType,
      "room_price": this.price
    }
    console.log(payload)
    const servicePath = this.utils.getApiConfigs('addRooms');
    this.commonservice.invokeService(servicePath[0].method, servicePath[0].path, payload)
      .then((data: any) => {
        if (data.status_code == "200") {
          this.getallRooms();
          this.display = "none";
          console.log(data)
        }
      })
  }

}
