import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Some dummy text';
  items: any[];
  location = '';
  diseases: any[];
  payment: any[];
  policyDetails: any[];
  staff: any[];
  totalPatients: any[];
  constructor(db: AngularFireDatabase) { 
    db.list('/hospital').valueChanges()
      .subscribe(items => {
        this.items = items;
        console.log(this.items);
      })
  }

  myFunction(value) {
    console.log(value);
    this.getLocation(value);
    this.getDiseases(value);
    this.getPayment(value);
    this.getPolicyDetials(value);
    this.getStaff(value);
    this.getTotalPatients(value);
  }

  getLocation(value) {
    if(value == 'kunalhospital') {
      this.location = this.items[0].location;
    }
  }

  getDiseases(value) {
    if(value == 'kunalhospital') {
      this.diseases = this.items[0].diseases;
    }
  }

  getPayment(value) {
    if(value == 'kunalhospital') {
      this.payment = this.items[0].payment;
    }
  }

  getPolicyDetials(value) {
    if(value == 'kunalhospital') {
      this.policyDetails = this.items[0].policydetails;
    }
  }

  getStaff(value) {
    if(value == 'kunalhospital') {
      this.staff = this.items[0].staff;
    }
  }

  getTotalPatients(value) {
    if(value == 'kunalhospital') {
      this.totalPatients = this.items[0].totalpatients;
    }
  }
  

  ngOnInit() {
  }

}
