import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { DasboardService } from '../services/dasboard.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

constructor(private dashboardService: DasboardService, private roleService: RoleService, private router: Router, private formBuilder: FormBuilder) {
  }
   users: object;
   roles: object;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.getUsers();
    this.getRoles();
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  getUsers() {
    this.dashboardService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);

    });
  }
  getRoles() {
    this.roleService.getRoles().subscribe(data => {
      this.roles = data;
      console.log(this.roles);

    });
  }
  removeUser(userId: number,  username: String) {
    if (confirm('Are you sure to delete ' + username)) {
      this.dashboardService.removeUser(userId).subscribe((res) => {
        this.getUsers();
      }, err => {
        console.log(err);
      });
    }
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
