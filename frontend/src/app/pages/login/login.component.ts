import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  UserLoginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  constructor(private userServive:UserService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  UserLogin()
  {
    
      let logingDetails = {
        email: this.UserLoginForm.value.email,
        password: this.UserLoginForm.value.password
      }
  
      console.log(logingDetails);
  
      this.userServive.UserLogin(logingDetails).subscribe((next:any) => {
          console.log('Successfully logged in');
          this.router.navigate(['/']);
        }, (err) => {
      });
   
  }

}
