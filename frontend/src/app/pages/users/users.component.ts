import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.userService.GetAllUsers().subscribe((res:any) =>{
      this.users = res;
      console.log(res);
      this.dtTrigger.next(this.users);
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
     };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}