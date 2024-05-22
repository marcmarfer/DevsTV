import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { last } from 'rxjs';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'This email is not valid' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'passwordMismatch', message: 'Passwords do not match' }
    ]
  };

  lastUserId: User[] = [];

  constructor(private router : Router, private userService : UserService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', Validators.required)
    },
      {
        validators: this.matchPassword
      }
    );

    this.lastUserId = this.userService.lastUserIdSignal();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      // Delete field confirmPassword from newUser object
      const { confirmPassword, ...newUser } = this.registerForm.value;
      this.userService.postUser(newUser);

      //set lastUserId to localStorage (+ 1 so it's the user now registered)
      localStorage.setItem('user', JSON.stringify(this.lastUserId[0].id_user + 1));
      this.router.navigate(['/videos']);
      this.registerForm.reset();
    }
  }

  matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }
}
