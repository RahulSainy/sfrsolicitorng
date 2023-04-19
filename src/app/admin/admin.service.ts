import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsersDetails() {
    
    return this.http.get<any[]>(' http://localhost:3000/api/user/admin');
  }
}
