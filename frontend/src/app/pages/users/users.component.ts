import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: any[];

  ngOnInit(): void {
    this.userService.GetAllUsers().subscribe((res:any) =>{
      this.users = res;
      console.log(res);
    });
  }


}