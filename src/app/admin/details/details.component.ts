import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {

  
    this.adminService.getUsersDetails().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.log('Error occurred: ', error);
      }
    );
  }
}
