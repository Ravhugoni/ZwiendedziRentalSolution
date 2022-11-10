import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logEmail: any;
  userDetails: any;

  constructor(private userServive:UserService,private router: Router) { }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');

        this.userServive.GetUserByEmail(this.logEmail).subscribe(res => {
        this.userDetails = res; 

        console.log(this.logEmail);

      }, (err) => {
      });
    }
    else
    {
      console.log('nonononoo');
    }

  }

  LogOut()
  {
    this.logEmail = sessionStorage.removeItem('loggedEmail'); 
    this.router.navigate(['/login']);
  }

}
