import { Component, ViewChild } from '@angular/core';
import { /*Events, MenuController, */ Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserData } from "../providers/user-data";

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { CreateProjectPage } from '../pages/create-project/create-project';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
  param?: String;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //For now until we add a logged in menu
  rootPage: any = LoginPage;

  loggedOutPages: PageInterface[] = [
    { title: 'Log In', component: LoginPage, icon: 'log-in' },
    { title: 'Sign Up', component: SignupPage, icon: 'person-add' }
  ];

  loggedInPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Profile', component: ProfilePage, icon: 'person', param:"username" },
    { title: 'New Project', component: CreateProjectPage, icon: 'create' }
  ];
  
  username: String = "";
  occupation: String = "";
  email: String = "";
  directory: string = "assets/img/profile/";
  chosenPicture: string = "";


  constructor(public menu: MenuController,  public events: Events, public userData: UserData, /*public storage: Storage,*/ public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
   this.initializeApp();
   this.enableMenu(false);
   this.startEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // don't want the back button to show in this scenario
    if(page.hasOwnProperty('param')){
      //alert("Page has param: " + page.param);
      this.nav.setRoot(page.component, {
        param1: page.param
    });
    }
    else{
      this.nav.setRoot(page.component);
    }     
  }

   isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'danger';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'danger';
    }
    return;
  }

   enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  getUserDetails() {
    this.userData.getCurrentUser().then((user) => {
    console.log("In get user details - app component");
    console.log(user);
    this.username = user.username;
    this.occupation = user.occupation;
    this.email = user.email;
    this.chosenPicture= this.directory + user.gender + ".jpg";
    this.loggedInPages.forEach(function(p){if (p.title === 'Profile') p.param=user.username;} );
  });/*.then((user) => {
    console.log("Triggering login event");
    this.events.publish('user:login');
  });*/

}
getLoginDetails() {
    this.userData.getCurrentUser().then((user) => {
    console.log("In get user details - app component");
    console.log(user);
    this.username = user.username;
    this.occupation = user.occupation;
    this.email = user.email;
    this.chosenPicture= this.directory + user.gender + ".jpg";
    this.loggedInPages.forEach(function(p){if (p.title === 'Profile') p.param=user.username;} );
  }).then((user) => {
    console.log("Triggering login event");
    this.events.publish('user:logined');
  });
}

  startEvents(){
    this.events.subscribe('user:login', () => {
      this.getLoginDetails();
      console.log("Logged in event triggered");
    });
    this.events.subscribe('user:logined', () => {
      this.enableMenu(true);
      this.nav.setRoot(HomePage);
      console.log("Logged in event triggered");
    });
    this.events.subscribe('user:changed', () => {
      this.getUserDetails();
      console.log("User changed event triggered");
    });
    
    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
}
