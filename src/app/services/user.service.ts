import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersSignal = signal<User[]>([]);

  constructor(private http:HttpClient, private tokenService : TokenService) { this.getUsers() }

  getUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe((users) => {
      this.usersSignal.set(users);
    });
  }

  loginUser(user: User) {
    this.http.post('http://localhost:3000/login', user).subscribe((response:any) => {
      this.tokenService.saveToken(response.token as string);
    });
  }

  postUser(user: User) {
    this.http.post('http://localhost:3000/save-user', user).subscribe((response:any) => {
      //sending response as string to save it on local storage
      this.tokenService.saveToken(response.token as string);
      // this.getUsers();
    });
  }
}
