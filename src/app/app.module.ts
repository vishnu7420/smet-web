import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageContentComponent } from './layout/page-content/page-content.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { AuthorisedSideNavTogglerComponent } from './layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserGuard } from './auth/user.guard';
import { ApilistService } from './services/apilist.service';
import { CommonService } from './services/common.service';
import { GlobalService } from './services/global.service';
import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { NgbPaginationModule, NgbAlertModule, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FloorsComponent } from './pages/floors/floors.component';
import { BedsComponent } from './pages/beds/beds.component';
import { ProfileComponent } from './pages/profile/profile.component';
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

import { NgxSpinnerModule } from "ngx-spinner";

import { ToastrModule } from 'ngx-toastr';
import { AddUserRolesComponent } from './pages/add-user-roles/add-user-roles.component';
import { UserRolesComponent } from './pages/user-roles/user-roles.component';
import { AdimagesComponent } from './pages/adimages/adimages.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { AddCollegeImagesComponent } from './pages/add-college-images/add-college-images.component';
import { AddCountryComponent } from './pages/add-country/add-country.component';
import { AddCollegeCourseComponent } from './pages/add-college-course/add-college-course.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    PageContentComponent,
    AuthorisedSideNavComponent,
    AuthorisedLayoutComponent,
    AuthorisedTopNavComponent,
    AuthorisedSideNavTogglerComponent,
    DashboardComponent,
    FloorsComponent,
    BedsComponent,
    ProfileComponent,
    CollegesComponent,
    CourcesComponent,
    ScopeComponent,
    UsersComponent,
    AddDegreeComponent,
    AddCourseDetailsComponent,
    CollegeDetailsComponent,
    AddCourseTypeComponent,
    AddDegreeTypeComponent,
    AdminUpdateComponent,
    AddUserRolesComponent,
    UserRolesComponent,
    AdimagesComponent,
    AddVideoComponent,
    AddCollegeImagesComponent,
    AddCountryComponent,
    AddCollegeCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    StorageServiceModule,
  ],
  providers: [AuthorisedTopNavComponent, ApilistService, CommonService,GlobalService, AccordionModule, AuthService,
    AuthGuard,
    UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
