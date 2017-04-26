import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { CreateProjectPage } from '../pages/create-project/create-project';
import { ProjectPage } from '../pages/project/project';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EditProjectPage } from '../pages/edit-project/edit-project';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserData } from '../providers/user-data';
import { ProjectData } from '../providers/project-data';

import { Reverse } from '../pipes/reverse';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ProfilePage,
    CreateProjectPage,
    ProjectPage,
    Reverse,
    EditProfilePage,
    EditProjectPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ProfilePage,
    CreateProjectPage,
    ProjectPage,
    EditProfilePage,
    EditProjectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    UserData,
    ProjectData
  ]
})
export class AppModule {}
