import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  users: User[] = [];
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'This email is not valid' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' }
    ],
    incorrectCredentials: [
      { type: 'incorrectCredentials', message: 'Incorrect email or password' }
    ]
  };

  constructor(private router: Router, private userService: UserService, private videoService: VideoService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    },
      {
        validators: this.isUserCorrect
      }
  );
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      if(this.isUserCorrect(this.loginForm) === null) {
        this.router.navigate(['/videos']);
        this.loginForm.reset();
      }
    }
  }

  isUserCorrect: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const email = control.get('email')?.value;
    const password = control.get('password')?.value;
  
    const users = this.userService.usersSignal();
  
    for (const user of users) {
      if (user.email === email && user.password === password) {
        //log in user and save its id to local storage
        this.userService.loginUser(user);
        localStorage.setItem('user', JSON.stringify(user.id_user));
        return null;
      }
    }
  
    return { 'incorrectCredentials': true };
  }
  
}
