import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { CollegesComponent } from './pages/colleges/colleges.component';
import { CourcesComponent } from './pages/cources/cources.component';
import { ScopeComponent } from './pages/scope/scope.component';
import { UsersComponent } from './pages/users/users.component';
import { AddDegreeComponent } from './pages/add-degree/add-degree.component';
import { AddCourseDetailsComponent } from './pages/add-course-details/add-course-details.component';
import { CollegeDetailsComponent } from './pages/college-details/college-details.component';
import { AddCourseTypeComponent } from './pages/add-course-type/add-course-type.component';
import { AddDegreeTypeComponent } from './pages/add-degree-type/add-degree-type.component';
import { AdminUpdateComponent } from './pages/admin-update/admin-update.component';
import { UserRolesComponent } from './pages/user-roles/user-roles.component';
import { AdimagesComponent } from './pages/adimages/adimages.component';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { AddCollegeImagesComponent } from './pages/add-college-images/add-college-images.component';
import { AddCountryComponent } from './pages/add-country/add-country.component';
import { AddCollegeCourseComponent } from './pages/add-college-course/add-college-course.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SigninComponent },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'colleges', component: CollegesComponent },
      { path: 'cources', component: CourcesComponent },
      { path: 'scope', component: ScopeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'addDegree', component: AddDegreeComponent },
      { path: 'addCourseDetails', component: AddCourseDetailsComponent },
      { path: 'collegeDetails', component: CollegeDetailsComponent },
      { path: 'courseType', component: AddCourseTypeComponent },
      { path: 'degreeType', component: AddDegreeTypeComponent },
      { path: 'profile', component: AdminUpdateComponent },
      { path: 'userRoles', component: UserRolesComponent },
      { path: 'adImages', component: AdimagesComponent },
      { path: 'adVideo', component: AddVideoComponent },
      { path: 'addClgImgs', component: AddCollegeImagesComponent },
      { path: 'addCountry', component: AddCountryComponent },
      { path: 'addcourseCollege', component: AddCollegeCourseComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
