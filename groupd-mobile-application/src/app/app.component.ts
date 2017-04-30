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
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { LogoutPage } from '../pages/logout/logout';
import { SearchPage } from '../pages/search/search';
import { BookmarksPage } from '../pages/bookmarks/bookmarks';
import { TutorialPage } from '../pages/tutorial/tutorial';

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

  rootPage: any;

  loggedOutPages: PageInterface[] = [
    { title: 'Log In', component: LoginPage, icon: 'log-in' },
    { title: 'Sign Up', component: SignupPage, icon: 'person-add' }
  ];

  loggedInPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'New Project', component: CreateProjectPage, icon: 'create' },
    { title: 'Search', component: SearchPage, icon: 'search'}
  ];
  accountPages: PageInterface[] = [
    { title: 'Profile', component: ProfilePage, icon: 'person', param:'username' },
    { title: 'Favourites', component: BookmarksPage, icon: 'star' },
    { title: 'Edit Account', component: EditProfilePage, icon: 'contact' },
    { title: 'Log out', component: LogoutPage, icon: 'log-out' }
  ];
  aboutPages: PageInterface[] = [
    { title: 'Tutorial', component: TutorialPage, icon: 'information' }
  ];
  
  username: String = "";
  occupation: String = "";
  email: String = "";
  directory: string = "assets/img/profile/";
  chosenPicture: string = "";

  constructor(public menu: MenuController, public events: Events, public userData: UserData, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
   this.initializeApp();
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.checkHasSeenTutorial().then((hasSeenTutorial) => {
      if(!hasSeenTutorial){
        //set the root to Tutorial on the first opening of app
        this.rootPage = TutorialPage;
        //set menu to logged out menu as the user cannot be logged in yet
        this.enableMenu(false);
        //set the has seen tutorial to true
        this.userData.setHasSeenTutorial();
      }else{
        this.userData.hasLoggedIn().then((hasLoggedIn) => {
          this.enableMenu(hasLoggedIn);
          if(hasLoggedIn){this.rootPage = HomePage;}
          else{this.rootPage = LoginPage;}
        });
      }
    });
   this.startEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // The platform is ready and our plugins are available.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    //if has param (the profile page)
    //set root and pass in param
    if(page.hasOwnProperty('param')){
      this.nav.setRoot(page.component, {
        param1: page.param
    });
    }
    else{
      //set root without param
      this.nav.setRoot(page.component);
    }     
  }

    //set the color of the active page to be red
   isActive(page: PageInterface) {

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'danger';
    }
    return;
  }

   //toggle logged in/out menu
   enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  //get user data for profile param, and any user data shown in the side menu
  getUserDetails() {
    this.userData.getCurrentUser().then((user) => {
    console.log("In get user details - app component");
    console.log(user);
    this.username = user.username;
    this.occupation = user.occupation;
    this.email = user.email;
    this.chosenPicture= this.directory + user.gender + ".jpg";
    this.accountPages.forEach(function(p){if (p.title === 'Profile') p.param=user.username;} );
  }).catch(()=>{});
}
//get user data for profile param, any user data shown in the side menu,
//and trigger 
getLoginDetails() {
    this.userData.getCurrentUser().then((user) => {
    console.log("In get user details - app component");
    console.log(user);
    this.username = user.username;
    this.occupation = user.occupation;
    this.email = user.email;
    this.chosenPicture= this.directory + user.gender + ".jpg";
    this.accountPages.forEach(function(p){if (p.title === 'Profile') p.param=user.username;} );
  }).then((user) => {
    console.log("Triggering login event");
    this.events.publish('user:loggedin');
  }).catch(()=>{});
}
  //start listening for events
  startEvents(){
    this.events.subscribe('user:login', () => {
      this.getLoginDetails();
      console.log("Logged in event triggered");
    });
    this.events.subscribe('user:loggedin', () => {
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
      this.nav.setRoot(LoginPage);
    });
  }
}
