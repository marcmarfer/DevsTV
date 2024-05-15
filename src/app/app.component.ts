import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DevsTV';

  constructor(private router: Router) {}

  isLoginPageOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
