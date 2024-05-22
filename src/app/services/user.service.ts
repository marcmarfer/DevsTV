import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersSignal = signal<User[]>([]);
  userLoggedSignal = signal<User[]>([]);
  lastUserIdSignal = signal<User[]>([]);

  constructor(private http: HttpClient, private tokenService: TokenService) { this.getUsers(), this.getLastUserId() }

  getUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe((users) => {
      this.usersSignal.set(users);
    });
  }

  getUserById(id: any) {
    this.http.get<User[]>(`http://localhost:3000/users/${id}`).subscribe((user) => {
      this.userLoggedSignal.set(user);
    });
  }

  getLastUserId() {
    this.http.get<User[]>('http://localhost:3000/last-user-id').subscribe((userId) => {
      this.lastUserIdSignal.set(userId);
    });
  }

  loginUser(user: User) {
    this.http.post('http://localhost:3000/login', user).subscribe((response: any) => {
      this.tokenService.saveToken(response.token as string);
    });
  }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() !== null;
  }

  postUser(user: User) {
    this.http.post('http://localhost:3000/save-user', user).subscribe((response: any) => {
      //sending response as string to save it on local storage
      this.tokenService.saveToken(response.token as string);
      // this.getUsers();
    });
  }
}
