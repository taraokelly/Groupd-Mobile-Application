import { Component, ViewChild } from '@angular/core';
import { /*Events, MenuController, */ Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserData } from "../providers/user-data";

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
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

  loggedInPages: PageInterface[] = [];

  constructor(public menu: MenuController,  public events: Events, public userData: UserData, /*public storage: Storage,*/ public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
   this.initializeApp();
   this.enableMenu(false);
   this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      console.log("Logged in event triggered");
    });
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
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
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
}
