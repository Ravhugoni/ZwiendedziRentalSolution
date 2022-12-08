import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private spinnerService: NgxSpinnerService) { }

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
     this.showSpinner();

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000); // 2 seconds
  }
}