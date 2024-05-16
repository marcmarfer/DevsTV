import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersSignal = signal<User[]>([]);

  constructor(private http:HttpClient) { }

  getUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe((users) => {
      this.usersSignal.set(users);
    })
  }

  postUser(user: User) {
    this.http.post('http://localhost:3000/save-user', user).subscribe(() => {
      this.getUsers();
    });
  }

}
