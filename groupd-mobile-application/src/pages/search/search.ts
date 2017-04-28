import { Component } from '@angular/core';

import { SearchUsersPage } from "../search-users/search-users";
import { SearchProjectsPage } from "../search-projects/search-projects";

@Component({
    selector: 'search',
  templateUrl: 'search.html'
})
export class SearchPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SearchProjectsPage;
  tab2Root: any = SearchUsersPage;

  constructor() {

  }
}