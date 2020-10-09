import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApilistService {
  apiService: any = [{
    'key': 'login',
    'path': 'login',
    'method': 'POST'
  },
  {
    'key': 'state',
    'path': 'state',
    'method': 'GET'
  },
  {
    'key': 'district',
    'path': 'district',
    'method': 'GET'
  },
  {
    'key': 'college',
    'path': 'college',
    'method': 'POST'
  },
  {
    'key': 'college',
    'path': 'college',
    'method': 'GET'
  },
  {
    'key': 'editcollege',
    'path': 'editcollege',
    'method': 'POST'
  },
  {
    'key': 'deletecollege',
    'path': 'deletecollege',
    'method': 'POST'
  },
  {
    'key': 'scope',
    'path': 'scope',
    'method': 'POST'
  },
  {
    'key': 'scope',
    'path': 'scope',
    'method': 'GET'
  },
  {
    'key': 'editscope',
    'path': 'editscope',
    'method': 'POST'
  },
  {
    'key': 'deletescope',
    'path': 'deletescope',
    'method': 'POST'
  },
  {
    'key': 'collegedetails',
    'path': 'collegedetails',
    'method': 'POST'
  },
  {
    'key': 'collegedetails',
    'path': 'collegedetails',
    'method': 'GET'
  },
  {
    'key': 'individualcollegecourse',
    'path': 'individualcollegecourse',
    'method': 'GET'
  },
  {
    'key': 'degree',
    'path': 'degree',
    'method': 'POST'
  },
  {
    'key': 'degree',
    'path': 'degree',
    'method': 'GET'
  },
  {
    'key': 'deletedegree',
    'path': 'deletedegree',
    'method': 'POST'
  },
  {
    'key': 'coursedetails',
    'path': 'coursedetails',
    'method': 'POST'
  },
  {
    'key': 'coursedetails',
    'path': 'coursedetails',
    'method': 'GET'
  },
  {
    'key': 'editcoursedetails',
    'path': 'editcoursedetails',
    'method': 'POST'
  },
  {
    'key': 'deletecoursedetails',
    'path': 'deletecoursedetails',
    'method': 'POST'
  },
  {
    'key': 'course',
    'path': 'course',
    'method': 'POST'
  },
  {
    'key': 'course',
    'path': 'course',
    'method': 'GET'
  },
  {
    'key': 'deletecourses',
    'path': 'deletecourses',
    'method': 'POST'
  },
  {
    'key': 'coursetype',
    'path': 'coursetype',
    'method': 'POST'
  },
  {
    'key': 'coursetype',
    'path': 'coursetype',
    'method': 'GET'
  },
  {
    'key': 'deletecoursetype',
    'path': 'deletecoursetype',
    'method': 'POST'
  },
  {
    'key': 'degreetype',
    'path': 'degreetype',
    'method': 'POST'
  },
  {
    'key': 'degreetype',
    'path': 'degreetype',
    'method': 'GET'
  },
  {
    'key': 'deletedegreetype',
    'path': 'deletedegreetype',
    'method': 'POST'
  },
  {
    'key': 'userroles',
    'path': 'userroles',
    'method': 'POST'
  },
  {
    'key': 'userroles',
    'path': 'userroles',
    'method': 'GET'
  },
  {
    'key': 'users',
    'path': 'users',
    'method': 'POST'
  },
  {
    'key': 'dashboardtype',
    'path': 'dashboardtype',
    'method': 'GET'
  },
  {
    'key': 'dashboard',
    'path': 'dashboard',
    'method': 'POST'
  },
  {
    'key': 'dashboard',
    'path': 'dashboard',
    'method': 'GET'
  },
  {
    'key': 'otp',
    'path': 'otp',
    'method': 'POST'
  },
  {
    'key': 'verifyotp',
    'path': 'verifyotp',
    'method': 'POST'
  },
  {
    'key': 'count',
    'path': 'count',
    'method': 'GET'
  },
  {
    'key': 'studentlist',
    'path': 'studentlist',
    'method': 'GET'
  },
  {
    'key': 'editpassword',
    'path': 'editpassword',
    'method': 'POST'
  },
  {
    'key': 'videourl',
    'path': 'videourl',
    'method': 'POST'
  },
  {
    'key': 'allvideourl',
    'path': 'allvideourl',
    'method': 'GET'
  },
  {
    'key': 'deletecollegevideo',
    'path': 'deletecollegevideo',
    'method': 'POST'
  },
  {
    'key': 'collegeimage',
    'path': 'collegeimage',
    'method': 'POST'
  },
  {
    'key': 'allcollegeimage',
    'path': 'allcollegeimage',
    'method': 'GET'
  },
  {
    'key': 'deletecollegeimage',
    'path': 'deletecollegeimage',
    'method': 'POST'
  },
  {
    'key': 'country',
    'path': 'country',
    'method': 'POST'
  },
  {
    'key': 'country',
    'path': 'country',
    'method': 'GET'
  },
  {
    'key': 'alltrendingcourse',
    'path': 'alltrendingcourse',
    'method': 'GET'
  },
  {
    'key': 'allforeignuniversity',
    'path': 'allforeignuniversity',
    'method': 'GET'
  },

]
  constructor() { }
  getApiConfigs(key: string) {
    return this.apiService.filter((item) => {
      if (item.key == key) {
        return item;
      }
    });
  }
}
