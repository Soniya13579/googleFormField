import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  userType: string = '';

  constructor(private route: Router) {}

  login() { 
    console.log('User Name:', this.userName);
    console.log('Password:', this.password);
    console.log('User Type:', this.userType);

    if(this.userType === 'admin') {
      console.log('Admin login successful!');
      this.route.navigate(['/admin']);
    }
    else if(this.userType === 'user') { 
      console.log('User login successful!');
      this.route.navigate(['/user']);
    }
  }

}
