import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public logEmail: any;
  users: any;

  constructor(private userServive: UserService, private router: Router) { }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userServive.GetAllUsers().subscribe((res:any) => {
          let result = res;
          
          this.users = result.filter(ress => ress.email === this.logEmail)
          if(this.users[0].usertype === 'admin')
          {
            this.router.navigate(['/admin']);
          }
          else
          {
            this.router.navigate(['/']);
          }


       });
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

}
