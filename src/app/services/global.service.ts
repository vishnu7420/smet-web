import { Inject, Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public data:any=[]
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private toastr: ToastrService
  ) { }

  showSuccess(message){
    this.toastr.success(message);
  }

  showError(message){
    this.toastr.error(message);
  }

  setLocalStore(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
   }

  getLocalStore(key): void {
    console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);
    console.log(this.data);
   }

}
