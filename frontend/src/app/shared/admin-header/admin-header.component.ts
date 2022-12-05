import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  public logEmail: any;
  users: any;

  constructor(private userServive: UserService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {
        this.logEmail = sessionStorage.getItem('loggedEmail');
        //get users list
        this.userServive.GetAllUsers().subscribe((res:any) => {
          let result = res;
          
          this.users = result.filter(ress => ress.email === this.logEmail)
          console.log(this.users);
       });
    }
    else
    {
      this.router.navigate(['/login']);
    }

  }

  LogOut()
  {
    this.logEmail = sessionStorage.removeItem('loggedEmail'); 
    this.router.navigate(['/login']);
    this.toast.success({detail:'Success',summary:'Successfully Logout!', sticky:false,position:'tr', duration:6000})
          
  }

}
